import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { User } from 'src/auth/entities/User';
import { CreateUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UnleashService } from 'src/infra/unleash/unleash.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly unleashService: UnleashService,
  ) {}
  @Get('lista')
  async getAll(): Promise<User[]> {
    const users = await this.userService.getAll();
    if (!users) {
      throw new NotFoundException('User not found');
    }
    return users;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('buscar')
  async findByCriteria(@Query() query: Record<string, any>): Promise<User[]> {
    const users = await this.userService.findByCriteria(query);

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  @Post('registrar')
  async register(@Body() dto: CreateUserDto): Promise<void> {
    const users = await this.userService.create(dto);

    return users;
  }

  @Get('/unleash')
  index(): string {
    const active = this.unleashService.isEnabled(
      'pichanga-price-from-disitributor',
    );
    return active ? 'feature is active' : 'feature is not active';
  }

  @Get('/unleash/new')
  unleash(): string {
    const active = this.unleashService.isEnabled(
      'pichanga-price-from-disitributor',
    );
    console.log('que paso ayer');
    return active ? 'feature is active' : 'feature is not active';
  }
}
