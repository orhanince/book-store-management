import { Module, forwardRef } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([]),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTService],
  exports: [AuthService]
})
export class AuthModule {}
