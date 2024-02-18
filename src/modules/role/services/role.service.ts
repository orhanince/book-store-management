import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';
import {
  CreateRoleRequest,
  DeleteUserRolesRequest,
  UpdateRoleRequest
} from '../dtos';
import { AddUserRolesRequest } from '../dtos/add-user-roles.dto';

@Injectable()
export class RoleService {
  constructor(private repository: RoleRepository) {}

  async createRole(createRoleRequest: CreateRoleRequest) {
    return await this.repository.createRole(createRoleRequest);
  }

  async getRoles() {
    return await this.repository.getRoles();
  }

  async updateRole(updateRoleRequest: UpdateRoleRequest) {
    return this.repository.updateRole(updateRoleRequest);
  }

  async addUserRoles(addUserRolesRequest: AddUserRolesRequest) {
    await this.repository.addUserRoles(addUserRolesRequest);
    return { success: true };
  }

  async deleteUserRoles(deleteUserRolesRequest: DeleteUserRolesRequest) {
    await this.repository.deleteUserRoles(deleteUserRolesRequest);
    return { success: true };
  }
}