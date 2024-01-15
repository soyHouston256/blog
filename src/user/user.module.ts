import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { USER_REPOSITORY } from './user.repository';
import { MongodbUserRepository } from './mongodb-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: MongodbUserRepository,
    },
    UserService,
  ],
  imports: [],
  exports: [UserService],
})
export class UserModule {}
