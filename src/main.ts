import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auth/guards/jwtAuth.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 3002
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard());

  const swg_options = new DocumentBuilder()
  .setTitle('traveler API')
  .setDescription("enjoy with traveler's API")
  .setVersion('1.0')
  .addBearerAuth()
  .setTermsOfService('terms of service usage')
  .build();
  const document = SwaggerModule.createDocument(app, swg_options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  Logger.log(`app is running on port ${port}`)
  
}
bootstrap();
