import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './entities/LoginDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto) {
    try {
      const { email, password } = data;
      console.log(email, password);

      const token = await this.authService.login(data);
      return { ...token };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
          message: 'Invalid email or password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
