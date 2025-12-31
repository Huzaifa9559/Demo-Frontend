import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  IsUrl,
} from 'class-validator';
import { ResourceType, ResourceStatus } from '../entities/resource.entity';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ResourceType)
  @IsNotEmpty()
  type: ResourceType;

  @IsString()
  @IsOptional()
  category?: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(ResourceStatus)
  @IsOptional()
  status?: ResourceStatus;

  @IsString()
  @IsOptional()
  author?: string;
}

