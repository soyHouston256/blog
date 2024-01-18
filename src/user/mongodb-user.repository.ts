import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UserRepository } from './user.repository';
import { User } from 'src/auth/entities/User';
import { ObjectId } from 'mongodb';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/register-user.dto';

@Injectable()
export class MongodbUserRepository implements UserRepository {
  collectionName = 'users';
  constructor(@InjectConnection() private connection: Connection) {}

  async create(user: User) {
    const { password } = user;
    const newHash = await hash(password, 10);
    const newWser = {
      ...user,
      password: newHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.connection
      .collection(this.collectionName)
      .insertOne({ ...newWser });
  }

  async getAll(): Promise<User[]> {
    const usersDB = await this.connection
      .collection(this.collectionName)
      .find()
      .toArray();
    const users: User[] = usersDB.map((user) => {
      const id = user._id.toString();
      return new User(
        (user.id = id),
        user.name,
        user.username,
        user.lastName,
        user.email,
        user.password,
        user.isAdmin,
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
    const id = userDB._id.toString();
    const user = new User(
      (userDB.id = id),
      userDB.name,
      userDB.username,
      userDB.lastName,
      userDB.email,
      userDB.password,
      userDB.isAdmin,
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
        const id = user._id.toString();
        return new User(
          (user.id = id),
          user.name,
          user.username,
          user.lastName,
          user.email,
          user.password,
          user.isAdmin,
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

  async update(userId: string, user: UpdateUserDto): Promise<User> {
    const userDB = await this.findById(userId);

    if (userDB) {
      const userToUpdate = { ...userDB, ...user };
      const { password } = user;

      if (password) {
        const newHash = await hash(password, 10);
        userToUpdate.password = newHash;
      }

      userToUpdate.updatedAt = new Date();

      const result = await this.connection
        .collection(this.collectionName)
        .updateOne({ _id: new ObjectId(userId) }, { $set: userToUpdate });
      if (result.modifiedCount == 0) {
        throw new Error(`Failed to update user with ID ${userId}`);
      }
      const userNew = this.findById(userId);
      return userNew;
    }
    return null;
  }

  async findByField(property: string, value: string) {
    const result = await this.connection
      .collection(this.collectionName)
      .findOne({ [property]: value });
    return result ? true : false;
  }
}
