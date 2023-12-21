import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../domain/user.repository';
import { User } from 'src/auth/entities/User';
import { CreateUserDto } from '../infrastructure/dto/register-user.dto';

@Injectable()
export class UserService {
  collectionName = 'users';
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async findById(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  async findByCriteria(criteria: Record<string, any>): Promise<User[]> {
    return this.userRepository.findByCriteria(criteria);
  }

  async create(dto: CreateUserDto): Promise<void> {
    return this.userRepository.create(dto);
  }
}
