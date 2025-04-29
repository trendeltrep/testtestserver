import { Controller, Post as HttpPost, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { Comment } from './comment.entity';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpPost()
  createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('content') content: string,
  ): Promise<Comment> {
    return this.commentsService.create(postId, content);
  }

  @Get()
  getComments(@Param('postId', ParseIntPipe) postId: number): Promise<Comment[]> {
    return this.commentsService.findByPost(postId);
  }
}
