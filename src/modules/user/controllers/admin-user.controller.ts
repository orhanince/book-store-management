import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller()
export class AdminUserController {
  constructor(private readonly userService: UserService) {}
}
