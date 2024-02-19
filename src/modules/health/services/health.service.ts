import { HttpException, Injectable } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';
import { DatabaseHealthIndicator } from '../indicators/database-health.indicator';
import { UserService } from 'src/modules/user/services/user.service';
import { RoleService } from 'src/modules/role/services/role.service';
import { ConfigService } from '@nestjs/config';
import { AddUserRolesRequest, CreateRoleRequest } from 'src/modules/role/dtos';
import { EncryptService } from 'src/modules/auth/services/encrypt.service';

@Injectable()
export class HealthService {
  constructor(
    private databaseHealthIndicator: DatabaseHealthIndicator,
    private health: HealthCheckService,
    private userService: UserService,
    private roleService: RoleService,
    private configService: ConfigService,
    private encryptService: EncryptService
  ) {}

  check() {
    const healthCheckResult = this.health
      .check([() => this.databaseHealthIndicator.isHealthy('database')])
      .catch((e) => {
        throw new HttpException('test', 503, e);
      });

    return healthCheckResult;
  }

  async seedDb() {
    const hashedPassword = await this.encryptService.hashPassword(
      this.configService.get('TEST_USER_PASSWORD')
    );
    const user = await this.userService.create(
      this.configService.get('TEST_USER_NAME'),
      this.configService.get('TEST_USER_EMAIL'),
      hashedPassword
    );

    delete user.password;

    const createRoleRequest: CreateRoleRequest = {
      title: this.configService.get('TEST_ROLE_TITLE'),
      key: this.configService.get('TEST_ROLE_KEY'),
      description: this.configService.get('TEST_ROLE_DESC'),
      active: true
    };

    const role = await this.roleService.createRole(createRoleRequest);

    const addUserRolesRequest: AddUserRolesRequest = {
      userID: user.ID,
      roleIDs: new Array<bigint>(role.ID)
    };
    const userRole = await this.roleService.addUserRoles(addUserRolesRequest);
    return {
      user,
      role,
      userRole
    };
  }
}
