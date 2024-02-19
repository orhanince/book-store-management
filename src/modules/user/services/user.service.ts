import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { AddUserRequest, CheckUserRequest } from '../dtos';
import { EncryptService } from 'src/modules/auth/services/encrypt.service';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private encryptService: EncryptService
  ) {}

  async create(name, email, password) {
    return await this.repository.createUser(name, email, password);
  }

  async getUser(checkUserRequest: CheckUserRequest) {
    const { email } = checkUserRequest;
    return await this.repository.getUserByEmail(email);
  }

  async getUsers() {
    return await this.repository.getUsers();
  }

  async addUser(addUserRequest: AddUserRequest) {
    const { name, email, password } = addUserRequest;
    const hashedPassword = await this.encryptService.hashPassword(password);
    return await this.repository.createUser(name, email, hashedPassword);
  }
}
