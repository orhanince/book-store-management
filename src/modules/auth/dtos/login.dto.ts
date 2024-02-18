import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @IsString()
  @ApiProperty({
    example: 'test@test.com'
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '123456'
  })
  password: string;
}
