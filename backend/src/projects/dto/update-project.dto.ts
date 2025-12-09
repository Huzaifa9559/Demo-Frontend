import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  projectCode?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  owner?: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  dueDate?: string;

  @IsOptional()
  tickets?: number;
}

