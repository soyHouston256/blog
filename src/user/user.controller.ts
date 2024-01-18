import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/entities/User';
import { CreateUserDto, UpdateUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('')
  async register(@Body() dto: CreateUserDto): Promise<void> {
    const users = await this.userService.create(dto);
    return users;
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
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

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Param('id') userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.userService.update(userId, dto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') userId: string): Promise<boolean> {
    const user = await this.userService.delete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async findByCriteria(@Query() query: Record<string, any>): Promise<User[]> {
    const users = await this.userService.findByCriteria(query);

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }
}
