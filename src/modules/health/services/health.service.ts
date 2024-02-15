import { HttpException, Injectable } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from '../indicators/database-health.indicator';

@Injectable()
export class HealthService {
  constructor(
    private databaseHealthIndicator: DatabaseHealthIndicator,
    private health: HealthCheckService,
  ) {}

  check() {
    const healthCheckResult = this.health
      .check([() => this.databaseHealthIndicator.isHealthy('database')])
      .catch((e) => {
        throw new HttpException('test', 503, e);
      });

    return healthCheckResult;
  }
}
