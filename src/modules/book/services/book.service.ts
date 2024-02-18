import { Injectable } from '@nestjs/common';
import { CreateBookRequest } from '../dtos';
import { BookRepository } from '../respotiroy/book.repository';

@Injectable()
export class BookService {
  constructor(private repository: BookRepository) {}

  async createBook(createBookRequest: CreateBookRequest) {
    return await this.repository.createBook(createBookRequest);
  }

  async getBooks() {
    return await this.repository.getBooks();
  }
}
