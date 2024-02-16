import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  AddUserRolesRequest,
  CreateRoleRequest,
  CreateRoleResponse,
  DeleteUserRolesRequest,
  RoleListResponse,
  UpdateRoleRequest,
  UpdateRoleResponse
} from '../dtos';

@ApiTags('Role')
@Controller('role')
export class AdminRoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('/admin/create')
  @ApiBody({
    type: CreateRoleRequest,
    description: 'Role json object.'
  })
  async createRole(
    @Body() createRoleRequest: CreateRoleRequest
  ): Promise<CreateRoleResponse> {
    return await this.roleService.createRole(createRoleRequest);
  }

  @Get('/admin/roles')
  async getRoles(): Promise<RoleListResponse> {
    return await this.roleService.getRoles();
  }

  @Put('/admin/update')
  @ApiBody({
    type: UpdateRoleRequest,
    description: 'Update role'
  })
  async updateRole(
    @Body() updateRoleRequest: UpdateRoleRequest
  ): Promise<UpdateRoleResponse> {
    return await this.roleService.updateRole(updateRoleRequest);
  }

  @Post('/admin/add-user-roles')
  @ApiBody({
    type: AddUserRolesRequest,
    description: 'Add user roles.'
  })
  async addUserRoles(
    @Body() addUserRolesRequest: AddUserRolesRequest
  ): Promise<object> {
    return await this.roleService.addUserRoles(addUserRolesRequest);
  }

  @Delete('/admin/delete-user-roles')
  @ApiBody({
    type: AddUserRolesRequest,
    description: 'Delete user roles.'
  })
  async deleteUserRoles(
    @Body() deleteUserRolesRequest: DeleteUserRolesRequest
  ): Promise<object> {
    return await this.roleService.deleteUserRoles(deleteUserRolesRequest);
  }
}
