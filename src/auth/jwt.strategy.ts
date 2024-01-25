import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstances } from './jwt.constances';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstances.secret,
    });
  }
  async validate(payload: any) {
    return {
      userId: payload.id,
      username: payload.username,
      isAdmin: payload.isAdmin,
      role: payload.role,
    };
  }
}
