import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_DB'),
  entities: ['./src/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['migrations/*.ts'],
  ssl: configService.get('DATABASE_USE_SSL') === 'true',
  synchronize: true
});
