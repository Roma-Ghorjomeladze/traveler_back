import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 3002
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(port);
  Logger.log(`app is running on port ${port}`)
  
}
bootstrap();
