import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource, ResourceType, ResourceStatus } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { QueryResourcesDto, SortBy, SortOrder } from './dto/query-resources.dto';
import {
  PaginatedResponse,
  buildPaginationMeta,
} from '../common/utils/response.util';

export interface ResourceRecord {
  key: string;
  title: string;
  description: string | null;
  type: ResourceType;
  category: string | null;
  url: string;
  tags: string[];
  status: ResourceStatus;
  author: string | null;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) {}

  private mapToResourceRecord(resource: Resource): ResourceRecord {
    return {
      key: resource.id,
      title: resource.title,
      description: resource.description,
      type: resource.type,
      category: resource.category,
      url: resource.url,
      tags: resource.tags,
      status: resource.status,
      author: resource.author,
      createdAt: resource.createdAt.toISOString(),
      updatedAt: resource.updatedAt.toISOString(),
    };
  }

  async findAll(queryDto: QueryResourcesDto): Promise<PaginatedResponse<ResourceRecord>> {
    const {
      search,
      type,
      category,
      status,
      tag,
      page = 1,
      pageSize = 10,
      sortBy = SortBy.CREATED_AT,
      sortOrder = SortOrder.DESC,
    } = queryDto;

    const queryBuilder = this.resourcesRepository.createQueryBuilder('resource');

    // Search filter
    if (search) {
      const normalizedSearch = search.trim().toLowerCase();
      queryBuilder.andWhere(
        '(LOWER(resource.title) LIKE :search OR LOWER(resource.description) LIKE :search)',
        { search: `%${normalizedSearch}%` },
      );
    }

    // Type filter
    if (type) {
      queryBuilder.andWhere('resource.type = :type', { type });
    }

    // Category filter
    if (category) {
      queryBuilder.andWhere('resource.category = :category', { category });
    }

    // Status filter
    if (status) {
      queryBuilder.andWhere('resource.status = :status', { status });
    }

    // Tag filter
    if (tag) {
      queryBuilder.andWhere(':tag = ANY(resource.tags)', { tag });
    }

    // Sorting
    const sortColumn = sortBy === SortBy.TITLE ? 'title' : 
                      sortBy === SortBy.TYPE ? 'type' : 
                      'createdAt';
    queryBuilder.orderBy(`resource.${sortColumn}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    // Pagination
    const skip = (page - 1) * pageSize;
    queryBuilder.skip(skip).take(pageSize);

    const [resources, totalItems] = await queryBuilder.getManyAndCount();

    const resourceRecords = resources.map((r) => this.mapToResourceRecord(r));
    const meta = buildPaginationMeta(page, pageSize, totalItems);

    return {
      data: resourceRecords,
      meta,
    };
  }

  async findOne(id: string): Promise<ResourceRecord> {
    const resource = await this.resourcesRepository.findOne({ where: { id } });

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    return this.mapToResourceRecord(resource);
  }

  async create(createResourceDto: CreateResourceDto): Promise<ResourceRecord> {
    const resource = this.resourcesRepository.create({
      ...createResourceDto,
      tags: createResourceDto.tags || [],
      status: createResourceDto.status || ResourceStatus.ACTIVE,
    });

    const saved = await this.resourcesRepository.save(resource);
    return this.mapToResourceRecord(saved);
  }

  async update(
    id: string,
    updateResourceDto: UpdateResourceDto,
  ): Promise<ResourceRecord> {
    const resource = await this.resourcesRepository.findOne({ where: { id } });

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    Object.assign(resource, updateResourceDto);

    const updated = await this.resourcesRepository.save(resource);
    return this.mapToResourceRecord(updated);
  }

  async remove(id: string): Promise<void> {
    const resource = await this.resourcesRepository.findOne({ where: { id } });

    if (!resource) {
      throw new NotFoundException('Resource not found');
    }

    await this.resourcesRepository.remove(resource);
  }
}

