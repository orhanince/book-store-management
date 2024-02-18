import {
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsAlphanumeric
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import BookStore from './../entities/book-store.entity';

export class CreateBookStoreRequest {
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
  slogan: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsBoolean()
  @ApiProperty()
  active: boolean;
}

export type CreateBookStoreResponse = BookStore;
