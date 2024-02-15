import { Module } from '@nestjs/common';
import { HealthController } from 'src/modules/health/controllers/health.controller';
import { HealthService } from './services/health.service';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from './indicators/database-health.indicator';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService, DatabaseHealthIndicator]
})
export class HealthModule {}
