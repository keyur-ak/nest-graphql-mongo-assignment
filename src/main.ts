import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
  const logger = new Logger(this.constructor.name);
  logger.log('Graphql Endpoint exposed http://localhost:3000/graphql');
}
bootstrap();
