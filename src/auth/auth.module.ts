import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstances } from './jwt.constances';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: jwtConstances.secret,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
})
export class AuthModule {}
