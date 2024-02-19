import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AddUserRequest, AddUserResponse, UserListResponse } from '../dtos';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/')
  async getUsers(): Promise<UserListResponse> {
    return await this.userService.getUsers();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('/')
  async addUser(
    @Body() addUserRequest: AddUserRequest
  ): Promise<AddUserResponse> {
    return await this.userService.addUser(addUserRequest);
  }
}
