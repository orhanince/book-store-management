import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { JWTService } from './jwt.service';
import { AuthResponse, LoginRequest } from './../dtos';
import { UserService } from 'src/modules/user/services/user.service';
import { RoleService } from 'src/modules/role/services/role.service';
import { EncryptService } from './encrypt.service';
import { GetUserRoleTypeRequest } from 'src/modules/role/dtos';

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
    const getUserRoleTypeRequest: GetUserRoleTypeRequest = {
      userID: user.ID
    };
    const userRoleType = await this.roleService.getUserRoleType(
      getUserRoleTypeRequest
    );

    const role = userRoleType;
    const jwtTokenObj = await this.jwtService.getUserJwtToken({
      name,
      email,
      role
    });
    return {
      name: user.name,
      email: user.email,
      role: role,
      accessToken: jwtTokenObj.accessToken,
      expiresIn: jwtTokenObj.expiresIn,
      refreshToken: jwtTokenObj.refreshToken,
      refreshTokenExpiresIn: jwtTokenObj.refreshTokenExpiresIn
    };
  }
}
