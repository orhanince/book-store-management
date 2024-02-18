import { Injectable } from '@nestjs/common';
import { CreateBookStoreRequest } from './../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BookStore from '../entities/book-store.entity';

@Injectable()
export class BookStoreRepository {
  constructor(
    @InjectRepository(BookStore)
    private bookStoreRepository: Repository<BookStore>
  ) {}

  async getBookStores() {
    return await this.bookStoreRepository.find();
  }

  async createBookStore(createBookStoreRequest: CreateBookStoreRequest) {
    const save = this.bookStoreRepository.create({
      name: createBookStoreRequest.name,
      slogan: createBookStoreRequest.slogan,
      address: createBookStoreRequest.address,
      active: createBookStoreRequest.active
    });
    return await this.bookStoreRepository.save(save, { reload: true });
  }
}
