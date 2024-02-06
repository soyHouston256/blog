import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY, PostsRepository } from './post.repository';
import { Posts } from './dto/post';
import { UpdatePostsDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY)
    private postRepository: PostsRepository,
  ) {}

  async create(dto): Promise<void> {
    return this.postRepository.create(dto);
  }

  async getAll(page: number, pageSize: number): Promise<Posts[]> {
    return this.postRepository.getAll(page, pageSize);
  }

  async findById(postsId: string): Promise<Posts> {
    return this.postRepository.findById(postsId);
  }

  async update(postsId: string, dto: UpdatePostsDto): Promise<Posts> {
    return this.postRepository.update(postsId, dto);
  }

  async delete(postsId: string): Promise<boolean> {
    return this.postRepository.delete(postsId);
  }
  async searchByCriteria(criteria: Record<string, any>): Promise<Posts[]> {
    return this.postRepository.searchByCriteria(criteria);
  }
  async searchByUserId(userId: string): Promise<Posts[]> {
    return this.postRepository.findByUserId(userId);
  }
  async findByCategories(
    categories: string,
    page: number,
    pageSize: number,
  ): Promise<Posts[]> {
    return this.postRepository.findByCategories(categories, page, pageSize);
  }
}
