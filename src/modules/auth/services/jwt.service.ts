import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JWTService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async getUserJwtToken({ name, email }) {
    const accessTokenExpireMinutes = this.configService.get(
      'JWT_ACCESS_EXPIRE_MINUTE'
    );
    const refreshTokenExpireMinutes = this.configService.get(
      'JWT_ACCESS_REFRESH_MINUTE'
    );
    const accessToken = this.jwtService.sign(
      { name, email },
      this.getJwtSignOptions(accessTokenExpireMinutes)
    );
    const refreshToken = this.jwtService.sign(
      { name, email },
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

  /**async jwtVerify() {
    try {
      const bearerAccessToken = headerMeta.getAuthorization();
      const accessToken = bearerAccessToken.toString().replace('Bearer ', '');
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
  }*/

  /**async jwtRefreshTokenVerify(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(
        refreshToken,
        this.getJwtVerifyOptions()
      );
      return BigInt(payload.sub);
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }*/

  /** async getActiveSessionByJwtToken(
    userID: bigint,
    metadata: Metadata | Headers
  ) {
    const headerMeta = this.getMetaFromData(metadata);
    const accessToken = headerMeta.getAuthorization();
    if (accessToken) {
      const userSession = await this.userSessionsRepository.getActiveSession(
        BigInt(userID),
        accessToken
      );
      if (userSession) {
        return userSession;
      }
    }
    throw new UnauthorizedException();
  }


  getJwtVerifyOptions() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      algorithms: [this.configService.get('JWT_ALGORITHM')]
    };
  }*/
}
