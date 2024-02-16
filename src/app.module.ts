import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './config/app.configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryDataBaseConfig } from './common/database/typeorm/typeorm.module';
import { HealthModule } from 'src/modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration]
    }),
    TypeOrmModule.forRoot(PrimaryDataBaseConfig()),
    EventEmitterModule.forRoot(),
    HealthModule,
    AuthModule,
    UserModule,
    RoleModule,
    JwtModule.register({
      global: true
    })
  ],
  providers: [Logger]
})
export class AppModule {}
