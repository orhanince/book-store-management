import { Injectable, NotFoundException } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { AuthResponse, LoginRequest, RegisterRequest } from './../dtos';
import { UserService } from 'src/modules/user/services/user.service';
import { RoleService } from 'src/modules/role/services/role.service';
//import { GetUserRoleTypeRequest } from 'src/modules/role/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
    private readonly roleService: RoleService
  ) {}
  async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    const { email } = loginRequest;
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new NotFoundException(404, 'User not found!');
    }
    const { name } = user;
    const role = 'user';
    const jwtTokenObj = await this.jwtService.getUserJwtToken({
      name,
      email,
      role
    });
    /**const getUserRoleTypeRequest: GetUserRoleTypeRequest = {
      userID: user.ID
    };
    const userRoleType = await this.roleService.getUserRoleType(
      getUserRoleTypeRequest
    );*/
    return {
      name: user.name,
      email: user.email,
      accessToken: jwtTokenObj.accessToken,
      role: 'user',
      expiresIn: jwtTokenObj.expiresIn,
      refreshToken: jwtTokenObj.refreshToken,
      refreshTokenExpiresIn: jwtTokenObj.refreshTokenExpiresIn
    };
  }

  async register(registerRequest: RegisterRequest): Promise<AuthResponse> {
    const { name, email, password } = registerRequest;
    const createUser = await this.userService.create(name, email, password);
    const role = 'user';
    const token = await this.jwtService.getUserJwtToken({ name, email, role });
    return {
      name: createUser.name,
      email: createUser.email,
      role: 'user',
      accessToken: token.accessToken,
      expiresIn: token.expiresIn,
      refreshToken: token.refreshToken,
      refreshTokenExpiresIn: token.refreshTokenExpiresIn
    };
  }
}
