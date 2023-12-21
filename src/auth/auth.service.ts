import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/application/user.service';
import { LoginDto } from './entities/LoginDto.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      password: 'changeme',
      name: 'Meliza Yesica',
      username: 'sosa2020',
      lastName: 'Sosa Mariño',
      email: 's.m.meliza@gmail.com',
      createdAt: new Date(),
    },
    {
      username: 'maria',
      password: 'guess',
    },
  ];
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    console.log(username, pass);
    //const user = await this.usersService.findOne(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    //const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    //return result;
    //return user;
  }
  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findByCriteria({ email });

    if (!user || user.length < 1) {
      console.log('si entramos');
      throw new HttpException('USER_NOT_FOUND', 404);
    }
    const checkPassword = await compare(password, user[0].password);

    if (!checkPassword) {
      throw new HttpException('INVALID_PASSWORD', 401);
    }
    const payload = { id: user[0].id, name: user[0].name };
    const token = await this.jwtService.sign(payload);
    //const data = user[0];
    const data = {
      user: user[0],
      token,
    };
    return data;
  }
}
