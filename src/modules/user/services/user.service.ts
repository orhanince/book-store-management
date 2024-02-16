import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CheckUserRequest } from '../dtos';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(name, email, password) {
    return await this.repository.createUser(name, email, password);
  }

  async getUser(checkUserRequest: CheckUserRequest) {
    const { email } = checkUserRequest;
    return await this.repository.getUserByEmail(email);
  }
}
