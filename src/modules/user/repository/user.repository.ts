import {
  Injectable,
  ConflictException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../entities/user.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>
  ) {}

  async createUser(name: string, email: string, password: string) {
    const user = await this.getUserByEmail(email);

    if (user) {
      throw new ConflictException('User already exist!');
    }

    const save = await this.userRepository.create({
      uuid: uuid(),
      name,
      email,
      password
    });

    return await this.userRepository.save(save, { reload: true });
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email: email
    });

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return user;
  }
}
