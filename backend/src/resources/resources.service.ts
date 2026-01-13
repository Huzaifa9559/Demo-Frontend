import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Resource as ResourceEntity,
  ResourceType as EntityResourceType,
  ResourceStatus as EntityResourceStatus,
} from './entities/resource.entity';
import {
  CreateResourceInput,
  UpdateResourceInput,
  ResourcesQueryInput,
  ResourceType,
  ResourceStatus,
  Resource as GraphQLResource,
  ResourcesOutput,
} from './resources.graphql.types';
import { buildPaginationMeta } from '../common/utils/response.util';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private resourcesRepository: Repository<ResourceEntity>,
  ) {}

  async findAll(input?: ResourcesQueryInput): Promise<ResourcesOutput> {
    const {
      search,
      type: graphqlType,
      category,
      status: graphqlStatus,
      tag,
      page = 1,
      pageSize = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = input || {};

    const queryBuilder =
      this.resourcesRepository.createQueryBuilder('resource');

    // Search filter
    if (search) {
      const normalizedSearch = search.trim().toLowerCase();
      queryBuilder.andWhere(
        '(LOWER(resource.title) LIKE :search OR LOWER(resource.description) LIKE :search)',
        { search: `%${normalizedSearch}%` },
      );
    }

    // Type filter
    if (graphqlType) {
      queryBuilder.andWhere('resource.type = :type', {
        type: graphqlType as EntityResourceType,
      });
    }

    // Category filter
    if (category) {
      queryBuilder.andWhere('resource.category = :category', { category });
    }

    // Status filter
    if (graphqlStatus) {
      queryBuilder.andWhere('resource.status = :status', {
        status: graphqlStatus as EntityResourceStatus,
      });
    }

    // Tag filter
    if (tag) {
      queryBuilder.andWhere(':tag = ANY(resource.tags)', { tag });
    }

    // Sorting
    const sortColumn =
      sortBy === 'title' ? 'title' : sortBy === 'type' ? 'type' : 'createdAt';
    queryBuilder.orderBy(
      `resource.${sortColumn}`,
      sortOrder.toUpperCase() as 'ASC' | 'DESC',
    );

    // Pagination
    const skip = (page - 1) * pageSize;
    queryBuilder.skip(skip).take(pageSize);

    const [resources, totalItems] = await queryBuilder.getManyAndCount();
    const meta = buildPaginationMeta(page, pageSize, totalItems);

    // Map entities to GraphQL types
    const graphqlResources = resources.map((resource) => ({
      key: resource.id,
      title: resource.title,
      description: resource.description,
      type: resource.type as ResourceType,
      category: resource.category,
      url: resource.url,
      tags: resource.tags,
      status: resource.status as ResourceStatus,
      author: resource.author,
      createdAt:
        resource.createdAt instanceof Date
          ? resource.createdAt
          : new Date(resource.createdAt),
      updatedAt:
        resource.updatedAt instanceof Date
          ? resource.updatedAt
          : new Date(resource.updatedAt),
    }));

    return {
      data: graphqlResources,
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

  async findOne(id: string): Promise<GraphQLResource> {
    const resource = await this.resourcesRepository.findOne({ where: { id } });

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    // Map entity to GraphQL type
    return {
      key: resource.id,
      title: resource.title,
      description: resource.description,
      type: resource.type as ResourceType,
      category: resource.category,
      url: resource.url,
      tags: resource.tags,
      status: resource.status as ResourceStatus,
      author: resource.author,
      createdAt:
        resource.createdAt instanceof Date
          ? resource.createdAt
          : new Date(resource.createdAt),
      updatedAt:
        resource.updatedAt instanceof Date
          ? resource.updatedAt
          : new Date(resource.updatedAt),
    };
  }

  async create(input: CreateResourceInput): Promise<GraphQLResource> {
    const resource = this.resourcesRepository.create({
      title: input.title,
      description: input.description,
      type: input.type as EntityResourceType,
      category: input.category,
      url: input.url,
      tags: input.tags || [],
      status:
        (input.status as EntityResourceStatus) || EntityResourceStatus.ACTIVE,
      author: input.author,
    });

    const saved = await this.resourcesRepository.save(resource);

    // Map entity to GraphQL type
    return {
      key: saved.id,
      title: saved.title,
      description: saved.description,
      type: saved.type as ResourceType,
      category: saved.category,
      url: saved.url,
      tags: saved.tags,
      status: saved.status as ResourceStatus,
      author: saved.author,
      createdAt:
        saved.createdAt instanceof Date
          ? saved.createdAt
          : new Date(saved.createdAt),
      updatedAt:
        saved.updatedAt instanceof Date
          ? saved.updatedAt
          : new Date(saved.updatedAt),
    };
  }

  async update(
    id: string,
    input: UpdateResourceInput,
  ): Promise<GraphQLResource> {
    const resource = await this.resourcesRepository.findOne({ where: { id } });

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    // Update fields
    if (input.title !== undefined) resource.title = input.title;
    if (input.description !== undefined)
      resource.description = input.description;
    if (input.type !== undefined)
      resource.type = input.type as EntityResourceType;
    if (input.category !== undefined) resource.category = input.category;
    if (input.url !== undefined) resource.url = input.url;
    if (input.tags !== undefined) resource.tags = input.tags;
    if (input.status !== undefined)
      resource.status = input.status as EntityResourceStatus;
    if (input.author !== undefined) resource.author = input.author;

    const updated = await this.resourcesRepository.save(resource);

    // Map entity to GraphQL type
    return {
      key: updated.id,
      title: updated.title,
      description: updated.description,
      type: updated.type as ResourceType,
      category: updated.category,
      url: updated.url,
      tags: updated.tags,
      status: updated.status as ResourceStatus,
      author: updated.author,
      createdAt:
        updated.createdAt instanceof Date
          ? updated.createdAt
          : new Date(updated.createdAt),
      updatedAt:
        updated.updatedAt instanceof Date
          ? updated.updatedAt
          : new Date(updated.updatedAt),
    };
  }

  async remove(id: string): Promise<void> {
    const resource = await this.resourcesRepository.findOne({ where: { id } });

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    await this.resourcesRepository.remove(resource);
  }
}
