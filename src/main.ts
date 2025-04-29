import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PostsService } from './posts/post.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000',
      'https://inquire-client-9ehhmjtet-maksyms-projects-e7f962b7.vercel.app/', 
      'https://inquire-client-coral.vercel.app/'],
  });

  app.setGlobalPrefix('api');

 

  await app.listen(3001);
}
bootstrap();

