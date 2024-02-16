import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  async getUsers() {
    return await this.repository.getUsers();
  }

  async getUserList() {
    return await this.repository.getUserList();
  }
}
