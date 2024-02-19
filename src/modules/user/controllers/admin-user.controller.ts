import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserListResponse } from '../dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { Roles } from './../../../decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('/user')
export class AdminUserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'store-manager')
  @Get('/admin/users')
  async getUsers(): Promise<UserListResponse> {
    return await this.userService.getUsers();
  }
}
