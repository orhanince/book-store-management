import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserRolesRequest {
  @IsNumber()
  @ApiProperty()
  roleID: bigint;

  @IsNumber()
  @ApiProperty()
  userID: bigint;
}
