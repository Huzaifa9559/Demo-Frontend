import { Injectable, UseGuards } from '@nestjs/common';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import {
  CreateResourceInput,
  UpdateResourceInput,
  ResourcesQueryInput,
  Resource,
  ResourcesOutput,
} from './resources.graphql.types';

// SDL first approach - Thin resolver that delegates to service layer
@Injectable()
export class ResourcesResolver {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async resources(
    @Args('input', { nullable: true }) input?: ResourcesQueryInput,
  ): Promise<ResourcesOutput> {
    return await this.resourcesService.findAll(input);
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async resource(@Args('id') id: string): Promise<Resource> {
    return await this.resourcesService.findOne(id);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createResource(
    @Args('input') input: CreateResourceInput,
  ): Promise<Resource> {
    return await this.resourcesService.create(input);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateResource(
    @Args('id') id: string,
    @Args('input') input: UpdateResourceInput,
  ): Promise<Resource> {
    return await this.resourcesService.update(id, input);
  }

  @Mutation()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteResource(@Args('id') id: string): Promise<boolean> {
    await this.resourcesService.remove(id);
    return true;
  }
}
