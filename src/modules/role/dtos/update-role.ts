import {
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsAlphanumeric,
  IsNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Role from '../entities/role.entity';

export class UpdateRoleRequest {
  @IsNumber()
  @ApiProperty()
  ID: bigint;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsAlphanumeric()
  @ApiProperty()
  key: string;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @ApiProperty()
  active: boolean;
}

export type UpdateRoleResponse = Role;
