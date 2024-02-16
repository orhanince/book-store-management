import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AdminUserController } from './controllers/admin-user.controller';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from 'src/modules/user/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([User, UserService])
  ],
  controllers: [AdminUserController, UserController],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService]
})
export class UserModule {}
