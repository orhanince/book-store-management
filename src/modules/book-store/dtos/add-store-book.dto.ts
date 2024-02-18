import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddStoreBookRequest {
  @IsNumber({}, { each: true })
  @ApiProperty()
  bookStoreIDs: bigint[];
  @IsNumber()
  @ApiProperty()
  bookID: bigint;
}
