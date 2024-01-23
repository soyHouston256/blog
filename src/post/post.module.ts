import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostsService } from './post.service';
import { POST_REPOSITORY } from './post.repository';
import { MongodbPostRepository } from './mongodb-post.repository';

@Module({
  controllers: [PostController],
  providers: [
    {
      provide: POST_REPOSITORY,
      useClass: MongodbPostRepository,
    },
    PostsService,
  ],
  imports: [],
  exports: [PostsService],
})
export class PostsModule {}
