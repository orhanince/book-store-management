import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function PrimaryDataBaseConfig(): TypeOrmModuleOptions {
  const configService: ConfigService = new ConfigService();
  return {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: parseInt(configService.get('DATABASE_PORT')),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: ['dist/**/*.entity{ .ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['dist/migrations/*.{ .ts,.js}'],
    ssl: configService.get('DATABASE_USE_SSL') === 'true',
    synchronize: true,
    parseInt8: true,
  };
}
