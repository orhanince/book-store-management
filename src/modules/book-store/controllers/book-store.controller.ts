import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  CreateBookStoreRequest,
  CreateBookStoreResponse,
  BookListResponse
} from './../dtos';
import { BookStoreService } from '../services/book-store.service';

@ApiTags('BookStore')
@Controller('book-store')
export class BookStoreController {
  constructor(private readonly bookStoreService: BookStoreService) {}
  @Post('/admin/create')
  @ApiBody({
    type: CreateBookStoreRequest,
    description: 'Add book store.'
  })
  async createBook(
    @Body() createBookStoreRequest: CreateBookStoreRequest
  ): Promise<CreateBookStoreResponse> {
    return await this.bookStoreService.createBookStore(createBookStoreRequest);
  }

  @Get('/admin/book-stores')
  async getRoles(): Promise<BookListResponse> {
    return await this.bookStoreService.getBookStores();
  }
}
