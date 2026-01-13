import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectsService],
  exports: [ProjectsService, TypeOrmModule], // Export TypeOrmModule for resolver to inject repository
})
export class ProjectsModule {}

