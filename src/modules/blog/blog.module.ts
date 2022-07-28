import { Module } from '@nestjs/common';
import { BlogResolver } from './resolvers/blog.resolver';
import { BlogService } from './services/blog.service';

@Module({
  providers: [BlogResolver, BlogService],
})
export class BlogModule {}
