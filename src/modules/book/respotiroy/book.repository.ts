import { Injectable } from '@nestjs/common';
import { CreateBookRequest } from './../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Book from '../entity/book.entity';
import slugify from 'slugify';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}

  async getBookByID(bookID: bigint) {
    return await this.bookRepository.findOne({
      where: {
        ID: bookID
      }
    });
  }
  async getBooks() {
    return await this.bookRepository.find();
  }

  async createBook(createBookRequest: CreateBookRequest) {
    const save = this.bookRepository.create({
      name: createBookRequest.name,
      slug: slugify(createBookRequest.name, {
        replacement: '_',
        trim: true,
        lower: true
      }),
      author: createBookRequest.author,
      description: createBookRequest.description,
      publishDate: createBookRequest.publishDate,
      publisher: createBookRequest.publisher,
      active: createBookRequest.active
    });
    return await this.bookRepository.save(save, { reload: true });
  }
}
