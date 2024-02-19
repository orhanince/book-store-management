import { Module, forwardRef } from '@nestjs/common';
import { HealthController } from 'src/modules/health/controllers/health.controller';
import { HealthService } from './services/health.service';
import { TerminusModule } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from './indicators/database-health.indicator';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TerminusModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule)
  ],
  controllers: [HealthController],
  providers: [HealthService, DatabaseHealthIndicator]
})
export class HealthModule {}
