//import { User } from 'src/auth/entities/User';

import { User } from 'src/auth/entities/User';
import { CreateUserDto } from './dto/register-user.dto';

export const USER_REPOSITORY = 'UserRepository';
export interface UserRepository {
  getAll(): Promise<User[]>;
  findById(userId: string): Promise<User | null>;
  findByCriteria(criteria: Record<string, any>): Promise<User[]>;
  create(user: CreateUserDto): void;
}
