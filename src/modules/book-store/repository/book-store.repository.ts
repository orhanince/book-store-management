import { Injectable, NotFoundException } from '@nestjs/common';
import { AddStoreBookRequest, CreateBookStoreRequest } from './../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BookStore from '../entities/book-store.entity';
import StoreBook from '../entities/store-book.entity';
import { BookService } from 'src/modules/book/services/book.service';
import { IBook } from 'src/interfaces/book.interface';
import { BookStatus } from 'src/enums/book-status.enum';

@Injectable()
export class BookStoreRepository {
  constructor(
    @InjectRepository(BookStore)
    private bookStoreRepository: Repository<BookStore>,
    @InjectRepository(StoreBook)
    private storeBookRepository: Repository<StoreBook>,
    private readonly bookService: BookService
  ) {}

  async getBookStores() {
    return this.bookStoreRepository
      .find({
        relations: {
          store_books: true
        }
      })
      .then(async (stores) => {
        for await (const store of stores) {
          const storeItem = JSON.parse(JSON.stringify(store));
          const storeBooks = storeItem.store_books;
          const storeBookList = [];
          for (let index = 0; index < storeBooks.length; index++) {
            const book: IBook = {
              ID: 0n,
              name: '',
              slug: '',
              author: '',
              publisher: '',
              publishedDate: 0,
              quantity: 0,
              status: ''
            };
            const bookItem = await this.bookService.getBookByID(
              storeBooks[index].bookID
            );
            book.ID = bookItem.ID;
            book.name = bookItem.name;
            book.slug = bookItem.slug;
            book.author = bookItem.author;
            book.publisher = bookItem.publisher;
            book.publishedDate = bookItem.publishDate;
            book.quantity = storeBooks[index].quantity;
            book.status =
              storeBooks[index].available === true
                ? BookStatus.AVAILABLE
                : BookStatus.NOT_AVAILABLE;
            storeBookList.push(book);
          }
          store.store_books = storeBookList;
        }
        return stores;
      });
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

  async getAvailableBooks(storeID: bigint) {
    const store = await this.bookStoreRepository.findOne({
      where: {
        ID: storeID
      },
      relations: {
        store_books: true
      }
    });

    if (!store) {
      throw new NotFoundException('Store not found!');
    }

    const bookStore = JSON.parse(JSON.stringify(store));
    const storeBooks = bookStore.store_books;
    const storeBookList = [];
    for await (const storeBook of storeBooks) {
      const book: IBook = {
        ID: 0n,
        name: '',
        slug: '',
        author: '',
        publisher: '',
        publishedDate: 0,
        quantity: 0,
        status: ''
      };
      const bookItem = await this.bookService.getBookByID(storeBook.bookID);
      book.ID = bookItem.ID;
      book.name = bookItem.name;
      book.slug = bookItem.slug;
      book.author = bookItem.author;
      book.publisher = bookItem.publisher;
      book.publishedDate = bookItem.publishDate;
      book.quantity = storeBook.quantity;
      book.status =
        storeBook.available === true
          ? BookStatus.AVAILABLE
          : BookStatus.NOT_AVAILABLE;
      storeBookList.push(book);
    }
    return storeBookList;
  }
}
