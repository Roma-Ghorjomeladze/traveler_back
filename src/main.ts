import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwtAuth.guard';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 3002
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard());
  await app.listen(port);
  Logger.log(`app is running on port ${port}`)
  
}
bootstrap();
