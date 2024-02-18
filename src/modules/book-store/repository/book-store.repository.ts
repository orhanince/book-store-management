import { Injectable } from '@nestjs/common';
import { AddStoreBookRequest, CreateBookStoreRequest } from './../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BookStore from '../entities/book-store.entity';
import StoreBook from '../entities/store-book.entity';

@Injectable()
export class BookStoreRepository {
  constructor(
    @InjectRepository(BookStore)
    private bookStoreRepository: Repository<BookStore>,
    @InjectRepository(StoreBook)
    private storeBookRepository: Repository<StoreBook>
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

  async addStoreBook(addStoreBookRequest: AddStoreBookRequest) {
    const records = [];
    addStoreBookRequest.bookStoreIDs.map(async (bookStoreID) => {
      records.push(
        this.storeBookRepository.create({
          bookID: addStoreBookRequest.bookID,
          bookStoreID
        })
      );
    });
    await this.storeBookRepository.upsert(records, {
      conflictPaths: ['bookID', 'bookStoreID']
    });
  }
}
