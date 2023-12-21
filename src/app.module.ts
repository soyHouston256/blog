import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UnleashService } from './infra/unleash/unleash.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    AuthModule,
    UserModule,

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('db'),
      inject: [ConfigService],
    }),
  ],
  providers: [UnleashService],
})
export class AppModule {}
