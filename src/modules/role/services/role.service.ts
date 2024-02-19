import { Injectable } from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';
import {
  CreateRoleRequest,
  DeleteUserRolesRequest,
  GetUserRoleTypeRequest,
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

  async getUserRoleType(getUserRoleTypeRequest: GetUserRoleTypeRequest) {
    const { userID } = getUserRoleTypeRequest;
    return await this.repository.getUserRoleType(userID);
  }

  async updateRole(roleID: bigint, updateRoleRequest: UpdateRoleRequest) {
    return this.repository.updateRole(roleID, updateRoleRequest);
  }

  async deleteRole(roleID: bigint) {
    return this.repository.deleteRole(roleID);
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
