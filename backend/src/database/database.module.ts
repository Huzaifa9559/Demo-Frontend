import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Resource } from '../resources/entities/resource.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('database.host');
        return {
          type: 'postgres',
          host,
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [User, Project, Resource],
          synchronize: false,
          logging: configService.get<string>('NODE_ENV') === 'development',
          ssl: host?.includes('render.com')
            ? {
                rejectUnauthorized: false,
              }
            : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

