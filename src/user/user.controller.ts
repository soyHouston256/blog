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
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../auth/entities/User';
import { CreateUserDto, UpdateUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('')
  async register(@Body() dto: CreateUserDto): Promise<void> {
    const users = await this.userService.create(dto);
    return users;
  }

  @Get('')
  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  async getAll(): Promise<User[]> {
    const users = await this.userService.getAll();
    if (!users) {
      throw new NotFoundException('User not found');
    }
    return users;
  }

  @Get(':id')
  @ApiBearerAuth()
  @Auth(Role.USER)
  async findById(@Param('id') userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Auth(Role.USER)
  async updateById(
    @Req() request,
    @Param('id') userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User | null> {
    const isAdmin = request.user.isAdmin;
    const isYourSelft = userId == request.user.userId ? true : false;
    if (!(isAdmin || isYourSelft)) {
      throw new NotFoundException('Forbidden resource');
    }
    const user = await this.userService.update(userId, dto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @Delete(':id')
  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  async delete(@Param('id') userId: string): Promise<boolean> {
    const user = await this.userService.delete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @Get('search')
  @ApiBearerAuth()
  @Auth(Role.USER)
  async findByCriteria(@Query() query: Record<string, any>): Promise<User[]> {
    const users = await this.userService.findByCriteria(query);

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }
}
