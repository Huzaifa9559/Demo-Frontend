import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  projectCode: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsNumber()
  @Min(0)
  tickets: number;
}

