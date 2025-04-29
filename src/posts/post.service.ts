import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['comments'], order: { createdAt: 'DESC' } });
  }


  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
  
  async findPaginated(page = 1, limit = 5): Promise<Post[]> {
    return this.postsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'ASC' },
      relations: ['comments'],
    });
  }
  

  create(postData: Partial<Post>): Promise<Post> {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async update(id: number, updateData: Partial<Post>): Promise<Post> {
    await this.postsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
