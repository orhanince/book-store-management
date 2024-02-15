import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './config/app.configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryDataBaseConfig } from './common/database/typeorm/typeorm.module';
import { HealthModule } from 'src/modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration],
    }),
    TypeOrmModule.forRoot(PrimaryDataBaseConfig()),
    EventEmitterModule.forRoot(),
    HealthModule,
  ],
  providers: [Logger],
})
export class AppModule {}
