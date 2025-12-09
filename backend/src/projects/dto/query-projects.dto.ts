import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum StatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  HOLD = 'hold',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
}

export enum RangeFilter {
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
}

export enum SortBy {
  DUE_DATE = 'dueDate',
  CREATED_AT = 'createdAt',
  PROJECT_CODE = 'projectCode',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class QueryProjectsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(StatusFilter)
  status?: StatusFilter;

  @IsOptional()
  @IsEnum(RangeFilter)
  range?: RangeFilter;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  take?: number = 10;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.DUE_DATE;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.ASC;
}

