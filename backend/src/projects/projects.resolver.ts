import { Injectable, UseGuards } from '@nestjs/common';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import {
  CreateProjectInput,
  UpdateProjectInput,
  ProjectsQueryInput,
  Project,
  ProjectsOutput,
} from './projects.graphql.types';

// SDL first approach - Thin resolver that delegates to service layer
@Injectable()
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
  ) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async projects(
    @Args('input', { nullable: true }) input?: ProjectsQueryInput
  ): Promise<ProjectsOutput> {
    return await this.projectsService.findAll(input);
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async project(@Args('id') id: string): Promise<Project> {
    return await this.projectsService.findOne(id);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createProject(
    @Args('input') input: CreateProjectInput
  ): Promise<Project> {
    return await this.projectsService.create(input);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateProject(
    @Args('id') id: string,
    @Args('input') input: UpdateProjectInput
  ): Promise<Project> {
    return await this.projectsService.update(id, input);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteProject(@Args('id') id: string): Promise<boolean> {
    await this.projectsService.remove(id);
    return true;
  }
}
