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
import { CreatePostDto, UpdatePostsDto } from './dto/register-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Posts } from './dto/post';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}
  @Post('')
  @UseGuards(JwtAuthGuard)
  async register(@Body() dto: CreatePostDto, @Req() request): Promise<void> {
    const author = request.user.userId;
    const newDto = { ...dto, author };
    const users = await this.postsService.create(newDto);
    return users;
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<Posts[]> {
    const users = await this.postsService.getAll();
    if (!users) {
      throw new NotFoundException('Posts not found');
    }
    return users;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
    @Param('id') postId: string,
    @Body() dto: UpdatePostsDto,
  ): Promise<Posts> {
    const user = await this.postsService.update(postId, dto);
    if (!user) {
      throw new NotFoundException('Posts not found');
    }
    return user;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') postsId: string): Promise<boolean> {
    const posts = await this.postsService.delete(postsId);
    if (!posts) {
      throw new NotFoundException('User not found');
    }
    return posts;
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async findByCriteria(@Query() query: Record<string, any>): Promise<Posts[]> {
    const user = await this.postsService.searchByCriteria(query);
    if (!user) {
      throw new NotFoundException('Posts not found');
    }
    return user;
  }

  @Get('user/:id')
  @UseGuards(JwtAuthGuard)
  async findByUserId(@Param('id') userId: string): Promise<Posts[]> {
    const user = await this.postsService.searchByUserId(userId);
    if (!user) {
      throw new NotFoundException('Posts not found');
    }
    return user;
  }
}
