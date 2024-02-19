import { IsString, MaxLength, MinLength, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserRequest {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(5)
  @ApiProperty()
  email: string;

  @IsString()
  @MaxLength(255)
  @MinLength(5)
  @ApiProperty()
  password: string;

  @IsBoolean()
  @ApiProperty()
  active: boolean;
}

export type AddUserResponse = any;
