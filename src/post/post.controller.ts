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
import { PostsService } from './post.service';
import { CreatePostDto } from './dto/register-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Posts } from './dto/post';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/enums/rol.enum';
import { Auth } from '../auth/decorators/auth.decorator';
import { UpdatePostsDto } from './dto/update-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}
  @Post('')
  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  async register(@Body() dto: CreatePostDto, @Req() request): Promise<void> {
    const author = request.user.userId;
    const newDto = { ...dto, author };
    const users = await this.postsService.create(newDto);
    return users;
  }

  @Get('')
  async getAll(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<Posts[]> {
    const users = await this.postsService.getAll(+page, +pageSize);
    if (!users) {
      throw new NotFoundException('Posts not found');
    }
    return users;
  }

  @Get(':id')
  async findById(@Param('id') postsId: string): Promise<Posts> {
    const user = await this.postsService.findById(postsId);
    if (!user) {
      throw new NotFoundException('Posts not found');
    }
    return user;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() request,
    @Param('id') postsId: string,
    @Body() dto: UpdatePostsDto,
  ): Promise<Posts> {
    const postsDB = await this.postsService.findById(postsId);
    const isAdmin = request.user.isAdmin;
    const isYourSelft = postsDB.author == request.user.userId ? true : false;
    if (!(isAdmin || isYourSelft)) {
      throw new NotFoundException('Forbidden resource');
    }
    const user = await this.postsService.update(postsId, dto);
    if (!user) {
      throw new NotFoundException('Posts not found');
    }
    return user;
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() request, @Param('id') postsId: string): Promise<boolean> {
    const postsDB = await this.postsService.findById(postsId);
    const isAdmin = request.user.isAdmin;
    const isYourSelft = postsDB.author == request.user.userId ? true : false;
    if (!(isAdmin || isYourSelft)) {
      throw new NotFoundException('Forbidden resource');
    }
    const posts = await this.postsService.delete(postsId);
    if (!posts) {
      throw new NotFoundException('User not found');
    }
    return posts;
  }

  @Get('user/:id')
  async findByUserId(@Param('id') userId: string): Promise<Posts[]> {
    const posts = await this.postsService.searchByUserId(userId);
    if (!posts) {
      throw new NotFoundException('Posts not found');
    }
    return posts;
  }

  @ApiTags('Filter')
  @Get('search')
  async findByCriteria(@Query() query: Record<string, any>): Promise<Posts[]> {
    const user = await this.postsService.searchByCriteria(query);
    if (!user) {
      throw new NotFoundException('Posts not found');
    }
    return user;
  }
  @ApiTags('Filter')
  @Get('filter/')
  async findByCategories(
    @Query('categories') categories: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<Posts[]> {
    const posts = await this.postsService.findByCategories(
      categories,
      +page,
      +pageSize,
    );
    if (!posts) {
      throw new NotFoundException('Posts not found');
    }
    return posts;
  }
}
