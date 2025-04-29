import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity';
import { Comment } from './comments/comment.entity';
import { PostsModule } from './posts/post.module';
import { CommentsModule } from './comments/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      entities: [Post, Comment],
      synchronize: true,
    }),
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
