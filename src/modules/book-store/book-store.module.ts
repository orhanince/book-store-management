import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { BookStoreController } from './controllers/book-store.controller';
import { BookStoreRepository } from './repository/book-store.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import BookStore from './entities/book-store.entity';
import { BookStoreService } from './services/book-store.service';
import BookStoreBook from './entities/store-book.entity';
@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([BookStore, BookStoreBook])
  ],
  controllers: [BookStoreController],
  providers: [BookStoreRepository, BookStoreService],
  exports: [BookStoreRepository, BookStoreService]
})
export class BookStoreModule {}
