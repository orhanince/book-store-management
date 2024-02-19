import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  CreateBookStoreRequest,
  CreateBookStoreResponse,
  AddStoreBookRequest,
  GetAvailableBookListResponse
} from './../dtos';
import { BookStoreService } from '../services/book-store.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
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

  @UseGuards(AuthGuard)
  @Roles('admin', 'store-manager')
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

  @Get('/get-available-books/:storeID')
  @ApiBody({
    description: 'Get available books from the store.'
  })
  async getAvailableBooks(
    @Param('storeID') storeID: bigint
  ): Promise<GetAvailableBookListResponse> {
    return await this.bookStoreService.getAvailableBooks(storeID);
  }
}
