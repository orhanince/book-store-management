import { Module, forwardRef } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RoleController } from './controllers/role.controller';
import { RoleRepository } from './repository/role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from './entities/role.entity';
import UserRole from './entities/user-role.entity';
import { RoleService } from './services/role.service';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([UserRole, Role]),
    forwardRef(() => AuthModule)
  ],
  controllers: [RoleController],
  providers: [RoleRepository, RoleService],
  exports: [RoleRepository, RoleService]
})
export class RoleModule {}
