import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectsDto, StatusFilter, SortBy, SortOrder } from './dto/query-projects.dto';
import * as dayjs from 'dayjs';
import {
  PaginatedResponse,
  buildPaginationMeta,
} from '../common/utils/response.util';

export interface ProjectRecord {
  key: string;
  projectCode: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  dueDate: string;
  tickets: number;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  private mapToProjectRecord(project: Project): ProjectRecord {
    return {
      key: project.id,
      projectCode: project.projectCode,
      name: project.name,
      owner: project.owner,
      status: project.status,
      dueDate: dayjs(project.dueDate).format('MMM D, YYYY'),
      tickets: project.tickets,
    };
  }

  private mapStatusFilter(statusFilter?: StatusFilter): ProjectStatus | null {
    if (!statusFilter || statusFilter === StatusFilter.ALL) {
      return null;
    }

    const statusMap: Record<StatusFilter, ProjectStatus> = {
      [StatusFilter.ACTIVE]: ProjectStatus.IN_PROGRESS,
      [StatusFilter.HOLD]: ProjectStatus.ON_HOLD,
      [StatusFilter.COMPLETED]: ProjectStatus.COMPLETED,
      [StatusFilter.BLOCKED]: ProjectStatus.BLOCKED,
      [StatusFilter.ALL]: null as any,
    };

    return statusMap[statusFilter] || null;
  }

  async findAll(queryDto: QueryProjectsDto): Promise<PaginatedResponse<ProjectRecord>> {
    const {
      search,
      status: statusFilter,
      range: rangeFilter,
      page = 1,
      take = 10,
      sortBy = SortBy.DUE_DATE,
      sortOrder = SortOrder.ASC,
    } = queryDto;

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
    const status = this.mapStatusFilter(statusFilter);
    if (status) {
      queryBuilder.andWhere('project.status = :status', { status });
    }

    // Range filter
    if (rangeFilter) {
      const now = dayjs();
      const rangeEndMap = {
        week: now.add(7, 'day'),
        month: now.add(1, 'month'),
        quarter: now.add(3, 'month'),
      };
      const rangeEnd = rangeEndMap[rangeFilter];
      const rangeStart = now.subtract(1, 'day');

      queryBuilder.andWhere('project.dueDate BETWEEN :rangeStart AND :rangeEnd', {
        rangeStart: rangeStart.toDate(),
        rangeEnd: rangeEnd.toDate(),
      });
    }

    // Sorting
    const sortColumn = sortBy === SortBy.DUE_DATE ? 'dueDate' : 
                      sortBy === SortBy.CREATED_AT ? 'createdAt' : 
                      'projectCode';
    queryBuilder.orderBy(`project.${sortColumn}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    // Pagination
    const skip = (page - 1) * take;
    queryBuilder.skip(skip).take(take);

    const [projects, totalItems] = await queryBuilder.getManyAndCount();

    const projectRecords = projects.map((p) => this.mapToProjectRecord(p));
    const meta = buildPaginationMeta(page, take, totalItems);

    return {
      data: projectRecords,
      meta,
    };
  }

  async findOne(id: string): Promise<ProjectRecord> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return this.mapToProjectRecord(project);
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectRecord> {
    // Check if projectCode already exists
    const existing = await this.projectsRepository.findOne({
      where: { projectCode: createProjectDto.projectCode },
    });

    if (existing) {
      throw new ConflictException('Project code already exists');
    }

    const project = this.projectsRepository.create({
      ...createProjectDto,
      dueDate: new Date(createProjectDto.dueDate),
    });

    const saved = await this.projectsRepository.save(project);
    return this.mapToProjectRecord(saved);
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectRecord> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Check if projectCode is being updated and if it conflicts
    if (updateProjectDto.projectCode && updateProjectDto.projectCode !== project.projectCode) {
      const existing = await this.projectsRepository.findOne({
        where: { projectCode: updateProjectDto.projectCode },
      });

      if (existing) {
        throw new ConflictException('Project code already exists');
      }
    }

    Object.assign(project, {
      ...updateProjectDto,
      dueDate: updateProjectDto.dueDate
        ? new Date(updateProjectDto.dueDate)
        : project.dueDate,
    });

    const updated = await this.projectsRepository.save(project);
    return this.mapToProjectRecord(updated);
  }

  async remove(id: string): Promise<void> {
    const project = await this.projectsRepository.findOne({ where: { id } });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await this.projectsRepository.remove(project);
  }
}

