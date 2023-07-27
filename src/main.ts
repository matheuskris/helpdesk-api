import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // This will remove any properties that are not in the DTO
      forbidNonWhitelisted: true, // This will throw an error if the request body has properties that are not in the DTO
      transform: true, // This will transform the request body into a DTO object
      transformOptions: {
         enableImplicitConversion: true, // This will transform the request body into a DTO object and also transform the properties to their respective types
       },
    }),
  )
  console.log('Starting server...')
  await app.listen(3000);
  console.log('Server started on port 3000! 🚀')
}
bootstrap();
