import {
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsAlphanumeric,
  IsNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Book from './../entity/book.entity';

export class CreateBookRequest {
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  @IsAlphanumeric()
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(3)
  @ApiProperty()
  author: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  publishDate: number;

  @IsString()
  @MaxLength(255)
  @MinLength(3)
  @IsAlphanumeric()
  @ApiProperty()
  publisher: string;

  @IsBoolean()
  @ApiProperty()
  active: boolean;
}

export type CreateBookResponse = Book;
