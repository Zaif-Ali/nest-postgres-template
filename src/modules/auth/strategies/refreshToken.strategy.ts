import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiConfigService } from 'src/shared/services/api-config.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  validate(
    req: Request,
    payload: any,
  ): { refreshToken: string } & Record<string, any> {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      throw new UnauthorizedException(
        'Refresh token not found in request headers',
      );
    }

    const refreshToken = authHeader.replace('Bearer', '').trim();

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token format');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { ...payload, refreshToken };
  }
}
