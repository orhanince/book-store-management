import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserListResponse } from '../dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('/user')
export class AdminUserController {
  constructor(private readonly userService: UserService) {}
  @Get('/admin/users')
  async getUsers(): Promise<UserListResponse> {
    return await this.userService.getUsers();
  }
}
