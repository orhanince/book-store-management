import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  CreateBookStoreRequest,
  CreateBookStoreResponse,
  BookListResponse,
  AddStoreBookRequest
} from './../dtos';
import { BookStoreService } from '../services/book-store.service';

@ApiTags('BookStore')
@Controller('book-store')
export class BookStoreController {
  constructor(private readonly bookStoreService: BookStoreService) {}

  @Get('/')
  @ApiBody({
    description: 'Get book store list.'
  })
  async getBookStores(): Promise<any> {
    return await this.bookStoreService.getBookStores();
  }
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

  @Post('/admin/add-store-book')
  @ApiBody({
    type: AddStoreBookRequest,
    description: 'Add a book to a store.'
  })
  async addStoreBook(
    @Body() addStoreBookRequest: AddStoreBookRequest
  ): Promise<object> {
    return await this.bookStoreService.addStoreBook(addStoreBookRequest);
  }
}
