import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';

config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Project],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.DATABASE_HOST?.includes('render.com')
    ? {
        rejectUnauthorized: false,
      }
    : false,
};

export default new DataSource(dataSourceOptions);

