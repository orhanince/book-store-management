import { Module, forwardRef } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from '../role/role.module';
import { EncryptService } from './services/encrypt.service';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([]),
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTService, EncryptService],
  exports: [AuthService, JWTService, EncryptService]
})
export class AuthModule {}
