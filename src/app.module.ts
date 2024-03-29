import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfiguration from './config/app.configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryDataBaseConfig } from './common/database/typeorm/typeorm.module';
import { HealthModule } from 'src/modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { BookModule } from './modules/book/book.module';
import { BookStoreModule } from './modules/book-store/book-store.module';
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
    BookModule,
    BookStoreModule,
    RoleModule,
    JwtModule.register({
      global: true
    })
  ],
  providers: [Logger]
})
export class AppModule {}
