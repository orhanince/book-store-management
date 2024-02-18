import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import Book from './entity/book.entity';
import { BookController } from './controllers/book.controller';
import { BookRepository } from './respotiroy/book.repository';
import { BookService } from './services/book.service';
@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookRepository, BookService],
  exports: [BookRepository, BookService]
})
export class BookModule {}
