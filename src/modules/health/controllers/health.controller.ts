import { Controller, Get } from '@nestjs/common';
import { HealthService } from 'src/modules/health/services/health.service';
import { HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  @HealthCheck()
  check() {
    return this.healthService.check();
  }

  @Get('/seed')
  async seed() {
    return this.healthService.seedDb();
  }
}
