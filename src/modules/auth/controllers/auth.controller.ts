import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthResponse, LoginRequest } from './../dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({
    type: LoginRequest,
    description: 'Login json object.'
  })
  async login(@Body() loginRequest: LoginRequest): Promise<AuthResponse> {
    return await this.authService.login(loginRequest);
  }
}
