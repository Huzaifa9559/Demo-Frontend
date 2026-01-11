import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Project as ProjectEntity,
  ProjectStatus as EntityProjectStatus,
} from './entities/project.entity';
import {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectsQueryInput,
  ProjectStatus,
  Project as GraphQLProject,
  ProjectsOutput,
} from './projects.graphql.types';
import * as dayjs from 'dayjs';
import { buildPaginationMeta } from '@/common/utils/response.util';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
  ) {}

  private mapGraphQLStatusToEntity(status: ProjectStatus): EntityProjectStatus {
    const statusMap: Record<ProjectStatus, EntityProjectStatus> = {
      IN_PROGRESS: EntityProjectStatus.IN_PROGRESS,
      ON_HOLD: EntityProjectStatus.ON_HOLD,
      COMPLETED: EntityProjectStatus.COMPLETED,
      BLOCKED: EntityProjectStatus.BLOCKED,
    };
    return statusMap[status] || EntityProjectStatus.IN_PROGRESS;
  }

  private mapEntityStatusToGraphQL(status: EntityProjectStatus): ProjectStatus {
    const statusMap: Record<EntityProjectStatus, ProjectStatus> = {
      [EntityProjectStatus.IN_PROGRESS]: 'IN_PROGRESS',
      [EntityProjectStatus.ON_HOLD]: 'ON_HOLD',
      [EntityProjectStatus.COMPLETED]: 'COMPLETED',
      [EntityProjectStatus.BLOCKED]: 'BLOCKED',
    };
    return statusMap[status] || 'IN_PROGRESS';
  }

  async findAll(input?: ProjectsQueryInput): Promise<ProjectsOutput> {
    const {
      search,
      status: graphqlStatus,
      range: rangeFilter,
      page = 1,
      take = 10,
      sortBy = 'dueDate',
      sortOrder = 'asc',
    } = input || {};

    const itemsPerPage = take;

    const queryBuilder = this.projectsRepository.createQueryBuilder('project');

    // Search filter
    if (search) {
      const normalizedSearch = search.trim().toLowerCase();
      queryBuilder.andWhere(
        '(LOWER(project.name) LIKE :search OR LOWER(project.projectCode) LIKE :search OR LOWER(project.owner) LIKE :search)',
        { search: `%${normalizedSearch}%` },
      );
    }

    // Status filter
    if (graphqlStatus) {
      const entityStatus = this.mapGraphQLStatusToEntity(graphqlStatus);
      queryBuilder.andWhere('project.status = :status', {
        status: entityStatus,
      });
    }

    // Range filter
    if (rangeFilter) {
      const now = dayjs();
      const rangeEndMap: Record<string, dayjs.Dayjs> = {
        week: now.add(7, 'day'),
        month: now.add(1, 'month'),
        quarter: now.add(3, 'month'),
      };
      const rangeEnd = rangeEndMap[rangeFilter];
      if (rangeEnd) {
        const rangeStart = now.subtract(1, 'day');
        queryBuilder.andWhere(
          'project.dueDate BETWEEN :rangeStart AND :rangeEnd',
          {
            rangeStart: rangeStart.toDate(),
            rangeEnd: rangeEnd.toDate(),
          },
        );
      }
    }

    // Sorting
    const sortColumn =
      sortBy === 'dueDate'
        ? 'dueDate'
        : sortBy === 'createdAt'
          ? 'createdAt'
          : 'projectCode';
    queryBuilder.orderBy(
      `project.${sortColumn}`,
      sortOrder.toUpperCase() as 'ASC' | 'DESC',
    );

    // Pagination
    const skip = (page - 1) * itemsPerPage;
    queryBuilder.skip(skip).take(itemsPerPage);

    const [projects, totalItems] = await queryBuilder.getManyAndCount();
    const meta = buildPaginationMeta(page, itemsPerPage, totalItems);

    // Map entities to GraphQL types
    const graphqlProjects = projects.map((project) => ({
      id: project.id,
      projectCode: project.projectCode,
      name: project.name,
      owner: project.owner,
      status: this.mapEntityStatusToGraphQL(project.status),
      dueDate:
        project.dueDate instanceof Date
          ? project.dueDate
          : new Date(project.dueDate),
      tickets: project.tickets,
      createdAt:
        project.createdAt instanceof Date
          ? project.createdAt
          : new Date(project.createdAt),
      updatedAt: project.updatedAt
        ? project.updatedAt instanceof Date
          ? project.updatedAt
          : new Date(project.updatedAt)
        : undefined,
    }));

    return {
      data: graphqlProjects,
      meta: {
        page: meta.page,
        take: meta.take,
        totalItems: meta.totalItems,
        totalPages: meta.totalPages,
        hasPreviousPage: meta.hasPreviousPage,
        hasNextPage: meta.hasNextPage,
      },
    };
  }

  async findOne(id: string): Promise<GraphQLProject> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Map entity to GraphQL type
    return {
      id: project.id,
      projectCode: project.projectCode,
      name: project.name,
      owner: project.owner,
      status: this.mapEntityStatusToGraphQL(project.status),
      dueDate:
        project.dueDate instanceof Date
          ? project.dueDate
          : new Date(project.dueDate),
      tickets: project.tickets,
      createdAt:
        project.createdAt instanceof Date
          ? project.createdAt
          : new Date(project.createdAt),
      updatedAt: project.updatedAt
        ? project.updatedAt instanceof Date
          ? project.updatedAt
          : new Date(project.updatedAt)
        : undefined,
    };
  }

  async create(input: CreateProjectInput): Promise<GraphQLProject> {
    // Check if projectCode already exists
    const existing = await this.projectsRepository.findOne({
      where: { projectCode: input.projectCode },
    });

    if (existing) {
      throw new ConflictException('Project code already exists');
    }

    const project = this.projectsRepository.create({
      projectCode: input.projectCode,
      name: input.name,
      owner: input.owner,
      status: this.mapGraphQLStatusToEntity(input.status),
      dueDate:
        input.dueDate instanceof Date ? input.dueDate : new Date(input.dueDate),
      tickets: input.tickets,
    });

    const saved = await this.projectsRepository.save(project);

    // Map entity to GraphQL type
    return {
      id: saved.id,
      projectCode: saved.projectCode,
      name: saved.name,
      owner: saved.owner,
      status: this.mapEntityStatusToGraphQL(saved.status),
      dueDate:
        saved.dueDate instanceof Date ? saved.dueDate : new Date(saved.dueDate),
      tickets: saved.tickets,
      createdAt:
        saved.createdAt instanceof Date
          ? saved.createdAt
          : new Date(saved.createdAt),
      updatedAt: saved.updatedAt
        ? saved.updatedAt instanceof Date
          ? saved.updatedAt
          : new Date(saved.updatedAt)
        : undefined,
    };
  }

  async update(id: string, input: UpdateProjectInput): Promise<GraphQLProject> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Check if projectCode is being updated and if it conflicts
    if (input.projectCode && input.projectCode !== project.projectCode) {
      const existing = await this.projectsRepository.findOne({
        where: { projectCode: input.projectCode },
      });

      if (existing) {
        throw new ConflictException('Project code already exists');
      }
    }

    // Update fields
    if (input.projectCode !== undefined)
      project.projectCode = input.projectCode;
    if (input.name !== undefined) project.name = input.name;
    if (input.owner !== undefined) project.owner = input.owner;
    if (input.status !== undefined)
      project.status = this.mapGraphQLStatusToEntity(input.status);
    if (input.dueDate !== undefined) {
      project.dueDate =
        input.dueDate instanceof Date ? input.dueDate : new Date(input.dueDate);
    }
    if (input.tickets !== undefined) project.tickets = input.tickets;

    const updated = await this.projectsRepository.save(project);

    // Map entity to GraphQL type
    return {
      id: updated.id,
      projectCode: updated.projectCode,
      name: updated.name,
      owner: updated.owner,
      status: this.mapEntityStatusToGraphQL(updated.status),
      dueDate:
        updated.dueDate instanceof Date
          ? updated.dueDate
          : new Date(updated.dueDate),
      tickets: updated.tickets,
      createdAt:
        updated.createdAt instanceof Date
          ? updated.createdAt
          : new Date(updated.createdAt),
      updatedAt: updated.updatedAt
        ? updated.updatedAt instanceof Date
          ? updated.updatedAt
          : new Date(updated.updatedAt)
        : undefined,
    };
  }

  async remove(id: string): Promise<void> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectsRepository.remove(project);
  }
}
