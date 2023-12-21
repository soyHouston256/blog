import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/user.controller';
import { UserService } from './application/user.service';
import { USER_REPOSITORY } from './domain/user.repository';
import { MongodbUserRepository } from './infrastructure/mongodb-user.repository';
import { UnleashService } from 'src/infra/unleash/unleash.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: MongodbUserRepository,
    },
    UserService,
    UnleashService,
  ],
  imports: [],
  exports: [UserService],
})
export class UserModule {}
