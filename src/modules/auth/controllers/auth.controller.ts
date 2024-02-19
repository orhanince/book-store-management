import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthResponse, LoginRequest, RegisterRequest } from './../dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiBody({
    type: RegisterRequest,
    description: 'Register json object.'
  })
  async register(
    @Body() registerRequest: RegisterRequest
  ): Promise<AuthResponse> {
    return await this.authService.register(registerRequest);
  }

  @Post('/login')
  @ApiBody({
    type: LoginRequest,
    description: 'Login json object.'
  })
  async login(@Body() loginRequest: LoginRequest): Promise<AuthResponse> {
    return await this.authService.login(loginRequest);
  }
}
