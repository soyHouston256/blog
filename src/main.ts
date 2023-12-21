import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import { UnleashService } from './infra/unleash/unleash.service';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  app.get(UnleashService);

  const httpConfig = configService.get('http');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(httpConfig.port, httpConfig.host);
}
bootstrap();
