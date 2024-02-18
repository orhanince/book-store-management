import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserRolesRequest {
  @IsNumber({}, { each: true })
  @ApiProperty()
  roleIDs: bigint[];
  @IsNumber()
  @ApiProperty()
  userID: bigint;
}
