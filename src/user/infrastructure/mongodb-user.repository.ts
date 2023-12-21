import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserRepository } from '../domain/user.repository';
import { User } from 'src/auth/entities/User';
import { ObjectId } from 'mongodb';
import { hash } from 'bcrypt';

@Injectable()
export class MongodbUserRepository implements UserRepository {
  collectionName = 'users';
  constructor(@InjectConnection() private connection: Connection) {}

  async getAll(): Promise<User[]> {
    const usersDB = await this.connection
      .collection(this.collectionName)
      .find()
      .toArray();
    const users: User[] = usersDB.map((user) => {
      return new User(
        user.id,
        user.name,
        user.username,
        user.lastName,
        user.email,
        user.password,
        user.createdAt,
        user.updatedAt,
      );
    });
    return users;
  }

  async findById(userId: string): Promise<User> {
    console.log('implementacion', userId);
    const userDB = await this.connection
      .collection(this.collectionName)
      .findOne({ _id: new ObjectId(userId) });
    if (!userDB) {
      return null;
    }
    const user = new User(
      userDB.id,
      userDB.name,
      userDB.username,
      userDB.lastName,
      userDB.email,
      userDB.password,
      userDB.createdAt,
      userDB.updatedAt,
    );
    return user;
  }

  async findByCriteria(criteria: Record<string, any>): Promise<User[]> {
    try {
      const usersDB = await this.connection
        .collection(this.collectionName)
        .find(criteria)
        .toArray();

      const users: User[] = usersDB.map((user) => {
        return new User(
          user.id,
          user.name,
          user.username,
          user.lastName,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
        );
      });

      return users;
    } catch (error) {
      console.error('Error en findByCriteria:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }

  async create(user: User) {
    const { password } = user;
    const newHash = await hash(password, 10);
    const newWser = { ...user, password: newHash };
    return this.connection
      .collection(this.collectionName)
      .insertOne({ ...newWser });
  }
}
