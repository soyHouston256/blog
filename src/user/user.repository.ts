//import { User } from 'src/auth/entities/User';

import { User } from 'src/auth/entities/User';
import { CreateUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  create(user: CreateUserDto): void;
  getAll(): Promise<User[]>;
  findById(userId: string): Promise<User | null>;
  update(userId: string, user: UpdateUserDto): Promise<User | null>;
  findByCriteria(criteria: Record<string, any>): Promise<User[]>;
  findByField(property: string, value: string): Promise<boolean>;
  delete(userId: string): Promise<boolean>;
}
