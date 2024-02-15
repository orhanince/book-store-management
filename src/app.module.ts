import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfiguration from './config/app.configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryDataBaseConfig } from './common/database/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration],
    }),
    TypeOrmModule.forRoot(PrimaryDataBaseConfig()),
    EventEmitterModule.forRoot(),
  ],
  providers: [Logger],
})
export class AppModule {}
