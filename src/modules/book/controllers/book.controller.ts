import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  CreateBookRequest,
  CreateBookResponse,
  BookListResponse
} from './../dtos';
import { BookService } from '../services/book.service';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post('/admin/create')
  @ApiBody({
    type: CreateBookRequest,
    description: 'Add book.'
  })
  async createBook(
    @Body() createBookRequest: CreateBookRequest
  ): Promise<CreateBookResponse> {
    return await this.bookService.createBook(createBookRequest);
  }

  @Get('/admin/books')
  async getRoles(): Promise<BookListResponse> {
    return await this.bookService.getBooks();
  }
}
