import { IsString } from 'class-validator';

export class CheckUserRequest {
  @IsString()
  email: string;
}

export type CheckUserResponse = {
  status: boolean;
  name: string;
  email: string;
};
