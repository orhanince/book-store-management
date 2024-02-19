import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { AuthResponse, LoginRequest, RegisterRequest } from './../dtos';
import { UserService } from 'src/modules/user/services/user.service';
import { RoleService } from 'src/modules/role/services/role.service';
import { EncryptService } from './encrypt.service';
//import { GetUserRoleTypeRequest } from 'src/modules/role/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JWTService,
    private readonly userService: UserService,
    private readonly encryptService: EncryptService,
    private readonly roleService: RoleService
  ) {}
  async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    const { email, password } = loginRequest;
    const user = await this.userService.getUser({ email });
    if (!user) {
      throw new NotFoundException(404, 'User not found!');
    }

    const checkPassword = await this.encryptService.comparePassword(
      password,
      user.password
    );
    if (!checkPassword) {
      throw new ConflictException('Password wrong!');
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
    const hashedPassword = await this.encryptService.hashPassword(password);
    const createUser = await this.userService.create(
      name,
      email,
      hashedPassword
    );
    const role = 'admin';
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
