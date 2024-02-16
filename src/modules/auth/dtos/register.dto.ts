import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({
    example: 'Test Name',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'test@test.com',
    required: true
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '123456',
    required: true
  })
  @IsString()
  password: string;
}
