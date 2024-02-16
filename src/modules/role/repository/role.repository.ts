import { Injectable } from '@nestjs/common';
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
    return await this.roleRepository.find();
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

  async updateRole(updateRole: UpdateRoleRequest) {
    await this.roleRepository.update(
      {
        ID: updateRole.ID
      },
      {
        key: updateRole.key,
        title: updateRole.title,
        description: updateRole.description,
        active: updateRole.active
      }
    );
    return this.getRoleById(updateRole.ID);
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
}
