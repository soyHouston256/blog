import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './entities/LoginDto.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findByCriteria({ email });

    if (!user || user.length < 1) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }
    const checkPassword = await compare(password, user[0].password);

    if (!checkPassword) {
      throw new HttpException('INVALID_PASSWORD', 401);
    }
    const payload = { id: user[0].id, username: user[0].username };

    const token = this.jwtService.sign(payload, {
      expiresIn: `${process.env.MINUTES_EXPIRE_TOKEN}m`,
    });

    const data = {
      user: user[0],
      access_token: token,
    };
    return data;
  }
}
