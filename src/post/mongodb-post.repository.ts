import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { PostsRepository } from './post.repository';
import { ObjectId } from 'mongodb';
import { Posts } from './dto/post';
import { UpdatePostsDto } from './dto/register-post.dto';

@Injectable()
export class MongodbPostRepository implements PostsRepository {
  collectionName = 'posts';
  constructor(@InjectConnection() private connection: Connection) {}

  async create(post: Posts) {
    const newPost = {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.connection.collection(this.collectionName).insertOne(newPost);
  }

  async getAll(paramPage: number, paramPageSize: number): Promise<Posts[]> {
    const pageSize = paramPageSize;
    const page = paramPage;
    const postssDB = await this.connection
      .collection(this.collectionName)
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    const result: Posts[] = await Promise.all(
      postssDB.map(async (posts) => {
        const author = this.getAuthor(posts.author);
        const id = posts._id.toString();
        return new Posts(
          (posts.id = id),
          posts.title,
          await (posts.author = author),
          posts.content,
          posts.categories,
          posts.isDraft,
          posts.createdAt,
          posts.updatedAt,
        );
      }),
    );
    return result;
  }

  async findById(postsId: string): Promise<Posts> {
    const postsDB = await this.connection
      .collection(this.collectionName)
      .findOne({ _id: new ObjectId(postsId) });
    if (!postsDB) {
      return null;
    }
    const id = postsDB._id.toString();
    const author = await this.getAuthor(postsDB.author);
    const posts = new Posts(
      (postsDB.id = id),
      postsDB.title,
      (postsDB.author = author),
      postsDB.content,
      postsDB.categories,
      postsDB.isDraft,
      postsDB.createdAt,
      postsDB.updatedAt,
    );
    return posts;
  }

  async update(postsId: string, posts: UpdatePostsDto): Promise<Posts> {
    const postsDB = await this.findById(postsId);

    const postsToUpdate = { ...postsDB, ...posts };

    postsToUpdate.updatedAt = new Date();

    const result = await this.connection
      .collection(this.collectionName)
      .updateOne({ _id: new ObjectId(postsId) }, { $set: postsToUpdate });
    if (result.modifiedCount == 0) {
      throw new Error(`Failed to update posts with ID ${postsId}`);
    }
    const postsNew = this.findById(postsId);
    return postsNew;
  }

  async delete(postsId: string): Promise<boolean> {
    const result = await this.connection
      .collection(this.collectionName)
      .deleteOne({ _id: new ObjectId(postsId) });
    return result.deletedCount > 0 ? true : false;
  }
  async getAuthor(userId: string) {
    const user = await this.connection
      .collection('users')
      .findOne({ _id: new ObjectId(userId) });
    const author = `${user.name} ${user.lastName}`;
    return author;
  }
  async searchByCriteria(criteria: Record<string, any>): Promise<Posts[]> {
    try {
      if (criteria.categories && criteria.categories.length > 0) {
        criteria.categories = {
          $in: JSON.parse(criteria.categories),
        };
      }
      if (criteria.title && criteria.title.length > 0) {
        criteria.title = {
          $regex: criteria.title,
          $options: 'i',
        };
      }
      const postsDB = await this.connection
        .collection(this.collectionName)
        .find(criteria)
        .toArray();

      const result: Posts[] = await Promise.all(
        postsDB.map(async (posts) => {
          const id = posts._id.toString();
          const author = this.getAuthor(posts.author);
          return new Posts(
            (posts.id = id),
            posts.title,
            await (posts.author = author),
            posts.content,
            posts.categories,
            posts.isDraft,
            posts.createdAt,
            posts.updatedAt,
          );
        }),
      );
      return result;
    } catch (error) {
      console.error('Error en findByCriteria:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }
  async findByUserId(userId: string): Promise<Posts[]> {
    try {
      const postsDB = await this.connection
        .collection(this.collectionName)
        .find({ author: userId })
        .toArray();

      const result: Posts[] = await Promise.all(
        postsDB.map(async (posts) => {
          const id = posts._id.toString();
          const author = this.getAuthor(posts.author);
          return new Posts(
            (posts.id = id),
            posts.title,
            await (posts.author = author),
            posts.content,
            posts.categories,
            posts.isDraft,
            posts.createdAt,
            posts.updatedAt,
          );
        }),
      );
      return result;
    } catch (error) {
      console.error('Error en findByCriteria:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  async findByCategories(
    categories: string,
    page: number,
    pageSize: number,
  ): Promise<Posts[]> {
    try {
      const postsDB = await this.connection
        .collection(this.collectionName)
        .find({ categories: { $in: JSON.parse(categories) } })
        .limit(pageSize)
        .toArray();

      const result: Posts[] = await Promise.all(
        postsDB.map(async (posts) => {
          const id = posts._id.toString();
          const author = this.getAuthor(posts.author);
          return new Posts(
            (posts.id = id),
            posts.title,
            await (posts.author = author),
            posts.content,
            posts.categories,
            posts.isDraft,
            posts.createdAt,
            posts.updatedAt,
          );
        }),
      );
      return result;
    } catch (error) {
      console.error('Error en findByCriteria:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }
}
