import { Injectable } from '@nestjs/common';
import { CreateBookStoreRequest } from '../dtos';
import { BookStoreRepository } from '../repository/book-store.repository';

@Injectable()
export class BookStoreService {
  constructor(private repository: BookStoreRepository) {}

  async createBookStore(createBookStoreRequest: CreateBookStoreRequest) {
    return await this.repository.createBookStore(createBookStoreRequest);
  }

  async getBookStores() {
    return await this.repository.getBookStores();
  }
}
