import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateRoleRequest,
  DeleteUserRolesRequest,
  UpdateRoleRequest
} from './../dtos';
import Role from './../entities/role.entity';
import UserRole from '../entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserRolesRequest } from '../dtos/add-user-roles.dto';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>
  ) {}

  async getRoles() {
    return await this.roleRepository.find({
      where: {
        active: true
      }
    });
  }

  async createRole(createRole: CreateRoleRequest) {
    const save = this.roleRepository.create({
      key: createRole.key,
      title: createRole.title,
      description: createRole.description,
      active: createRole.active
    });
    return await this.roleRepository.save(save, { reload: true });
  }

  async getRoleById(ID: bigint) {
    return await this.roleRepository.findOne({
      where: {
        ID
      }
    });
  }

  async getUserRoleType(userID: bigint) {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        userID: userID
      }
    });

    if (!userRole) {
      throw new NotFoundException('User role not found!');
    }

    const role = await this.roleRepository.findOne({
      where: {
        ID: userRole.roleID
      }
    });

    return role.key;
  }

  async updateRole(roleID: bigint, updateRole: UpdateRoleRequest) {
    await this.roleRepository.update(
      {
        ID: roleID
      },
      {
        key: updateRole.key,
        title: updateRole.title,
        description: updateRole.description,
        active: updateRole.active
      }
    );
    return this.getRoleById(roleID);
  }
  async addUserRoles(addUserRolesRequest: AddUserRolesRequest) {
    const records = [];
    addUserRolesRequest.roleIDs.map(async (roleID) => {
      records.push(
        this.userRoleRepository.create({
          userID: addUserRolesRequest.userID,
          roleID
        })
      );
    });
    await this.userRoleRepository.upsert(records, {
      conflictPaths: ['userID', 'roleID']
    });
  }

  async deleteUserRoles(deleteUserRolesRequest: DeleteUserRolesRequest) {
    await this.userRoleRepository.delete({
      userID: deleteUserRolesRequest.userID,
      roleID: deleteUserRolesRequest.roleID
    });
  }

  async deleteRole(roleID: bigint) {
    return this.roleRepository.update(
      {
        ID: roleID
      },
      {
        active: false,
        updatedAt: new Date(),
        deletedAt: new Date()
      }
    );
  }
}
