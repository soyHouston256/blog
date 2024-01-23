import { Posts } from './dto/post';
import { UpdatePostsDto } from './dto/register-post.dto';

export const POST_REPOSITORY = 'PostsRepository';
export interface PostsRepository {
  create(posts): void;
  getAll(page: number, pageSize: number): Promise<Posts[]>;
  findById(postId: string): Promise<Posts | null>;
  update(postsId: string, posts: UpdatePostsDto): Promise<Posts | null>;
  delete(postsId: string): Promise<boolean>;
  searchByCriteria(criteria: Record<string, any>): Promise<Posts[]>;
  findByUserId(userId: string): Promise<Posts[]>;
  findByCategories(
    categories: string,
    page: number,
    pageSize: number,
  ): Promise<Posts[]>;
}
