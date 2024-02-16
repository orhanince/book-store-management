import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller()
export class AdminUserController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  async getUserList(): Promise<unknown> {
    return await this.userService.getUserList();
  }
}
