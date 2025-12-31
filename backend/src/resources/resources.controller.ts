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
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { QueryResourcesDto } from './dto/query-resources.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { buildSuccessResponse } from '../common/utils/response.util';

@Controller('resources')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async findAll(@Query() queryDto: QueryResourcesDto) {
    const result = await this.resourcesService.findAll(queryDto);
    return buildSuccessResponse(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.resourcesService.findOne(id);
    return buildSuccessResponse(result);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createResourceDto: CreateResourceDto) {
    const result = await this.resourcesService.create(createResourceDto);
    return buildSuccessResponse(result);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    const result = await this.resourcesService.update(id, updateResourceDto);
    return buildSuccessResponse(result);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.resourcesService.remove(id);
    return;
  }
}

