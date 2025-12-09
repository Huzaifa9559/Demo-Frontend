import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { buildSuccessResponse } from '../common/utils/response.util';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query() queryDto: QueryProjectsDto) {
    const result = await this.projectsService.findAll(queryDto);
    return buildSuccessResponse(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.projectsService.findOne(id);
    return buildSuccessResponse(result);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createProjectDto: CreateProjectDto) {
    const result = await this.projectsService.create(createProjectDto);
    return buildSuccessResponse(result);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const result = await this.projectsService.update(id, updateProjectDto);
    return buildSuccessResponse(result);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.projectsService.remove(id);
    return;
  }
}

