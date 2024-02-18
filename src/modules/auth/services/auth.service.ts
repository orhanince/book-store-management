import { Injectable, NotFoundException } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { AuthResponse, LoginRequest, RegisterRequest } from './../dtos';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService
  ) {}
  async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    const { email } = loginRequest;
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new NotFoundException(404, 'User not found!');
    }
    const { name } = user;
    const jwtTokenObj = await this.jwtService.getUserJwtToken({ name, email });
    return {
      name: user.name,
      email: user.email,
      accessToken: jwtTokenObj.accessToken,
      expiresIn: jwtTokenObj.expiresIn,
      refreshToken: jwtTokenObj.refreshToken,
      refreshTokenExpiresIn: jwtTokenObj.refreshTokenExpiresIn
    };
  }

  async register(registerRequest: RegisterRequest): Promise<AuthResponse> {
    const { name, email, password } = registerRequest;
    const createUser = await this.userService.create(name, email, password);
    const token = await this.jwtService.getUserJwtToken({ name, email });
    return {
      name: createUser.name,
      email: createUser.email,
      accessToken: token.accessToken,
      expiresIn: token.expiresIn,
      refreshToken: token.refreshToken,
      refreshTokenExpiresIn: token.refreshTokenExpiresIn
    };
  }
}
