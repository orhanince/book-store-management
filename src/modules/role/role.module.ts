import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AdminRoleController } from './controllers/admin-role.controller';
import { RoleRepository } from './repository/role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from './entities/role.entity';
import UserRole from './entities/user-role.entity';
import { RoleService } from './services/role.service';
@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([UserRole, Role])],
  controllers: [AdminRoleController],
  providers: [RoleRepository, RoleService],
  exports: [RoleRepository, RoleService]
})
export class RoleModule {}
