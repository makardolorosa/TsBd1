//import { User } from 'src/domain/user/user.entity';
import 'reflect-metadata';

import { DataSource } from 'typeorm';
//import { Post } from '@/domain/post/post.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'blog',
  logging: true,
  entities: ['./**/*.entity.ts'],
  // '../**/*.entity.{ts,js}'
  migrations: ['src/migrations/*.ts'],
  // migrationsTableName: 'custom_migration_table',
});
