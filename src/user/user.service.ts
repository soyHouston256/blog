import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from './user.repository';
import { User } from 'src/auth/entities/User';
import { CreateUserDto, UpdateUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  collectionName = 'users';
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<void> {
    return this.userRepository.create(dto);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async findById(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  async update(userId: string, dto: UpdateUserDto): Promise<User | null> {
    return this.userRepository.update(userId, dto);
  }

  async findByCriteria(criteria: Record<string, any>): Promise<User[]> {
    return this.userRepository.findByCriteria(criteria);
  }
  async findByField(property: string, value: string): Promise<boolean> {
    return this.userRepository.findByField(property, value);
  }
}
