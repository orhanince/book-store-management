import { Module, forwardRef } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from 'src/modules/user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([User, UserService]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService]
})
export class UserModule {}
