import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserRoleTypeRequest {
  @IsNumber()
  @ApiProperty()
  userID: bigint;
}

export type GetUserRoleTypeResponse = string;
