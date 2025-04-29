import {
  Controller,
  Get,
  Post as HttpPost,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { Post as BlogPost } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<BlogPost[]> {
    if (!page || !limit) {
      return this.postsService.findAll();
    }
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    return this.postsService.findPaginated(pageNum, limitNum);
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BlogPost> {
    return this.postsService.findOne(id);
  }

  @HttpPost()
  create(@Body() postData: Partial<BlogPost>): Promise<BlogPost> {
    return this.postsService.create(postData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<BlogPost>,
  ): Promise<BlogPost> {
    return this.postsService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postsService.remove(id);
  }
}
