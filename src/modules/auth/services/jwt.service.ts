import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async getUserJwtToken({ name, email, role }) {
    const accessTokenExpireMinutes = this.configService.get(
      'JWT_ACCESS_EXPIRE_MINUTE'
    );
    const refreshTokenExpireMinutes = this.configService.get(
      'JWT_ACCESS_REFRESH_MINUTE'
    );
    const accessToken = this.jwtService.sign(
      { name, email, role },
      this.getJwtSignOptions(accessTokenExpireMinutes)
    );
    const refreshToken = this.jwtService.sign(
      { name, email, role },
      this.getJwtSignOptions(refreshTokenExpireMinutes)
    );

    return {
      accessToken: accessToken,
      expiresIn: new Date().getTime() + accessTokenExpireMinutes * 60 * 1000,
      refreshToken: refreshToken,
      refreshTokenExpiresIn:
        new Date().getTime() + refreshTokenExpireMinutes * 60 * 1000
    };
  }

  getJwtSignOptions(expires_in_minutes: number) {
    const jwtSignOptions = {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: expires_in_minutes.toString() + 'm',
      algorithm: this.configService.get('JWT_ALGORITHM')
    };
    return jwtSignOptions;
  }

  async jwtVerify(token) {
    try {
      const accessToken = token.toString().replace('Bearer ', '');
      if (accessToken) {
        return await this.jwtService.verifyAsync(
          accessToken,
          this.getJwtVerifyOptions()
        );
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  getJwtVerifyOptions() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      algorithms: [this.configService.get('JWT_ALGORITHM')]
    };
  }
}
