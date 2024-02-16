import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserList() {
    return await this.userRepository.find();
  }
}
