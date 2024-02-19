import { Body, Controller, Get, Post, Put, Delete, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(AuthGuard)
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles('admin')
  @Get('/')
  async getRoles(): Promise<RoleListResponse> {
    return await this.roleService.getRoles();
  }

  @Roles('admin')
  @Post('/')
  @ApiBody({
    type: CreateRoleRequest,
    description: 'Role json object.'
  })
  async createRole(
    @Body() createRoleRequest: CreateRoleRequest
  ): Promise<CreateRoleResponse> {
    return await this.roleService.createRole(createRoleRequest);
  }

  @Roles('admin')
  @Put('/update')
  @ApiBody({
    type: UpdateRoleRequest,
    description: 'Update role'
  })
  async updateRole(
    @Body() updateRoleRequest: UpdateRoleRequest
  ): Promise<UpdateRoleResponse> {
    return await this.roleService.updateRole(updateRoleRequest);
  }

  @Roles('admin')
  @Post('/add-user-roles')
  @ApiBody({
    type: AddUserRolesRequest,
    description: 'Add user roles.'
  })
  async addUserRoles(
    @Body() addUserRolesRequest: AddUserRolesRequest
  ): Promise<object> {
    return await this.roleService.addUserRoles(addUserRolesRequest);
  }

  @Roles('admin')
  @Delete('/delete-user-roles')
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
