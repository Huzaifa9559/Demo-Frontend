import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesService } from './resources.service';
import { Resource } from './entities/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}

