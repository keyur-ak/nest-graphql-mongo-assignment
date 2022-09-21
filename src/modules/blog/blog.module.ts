import { Module } from '@nestjs/common';
import { ShareServiceModule } from '../../shared/share-service.module';
import { BlogResolver } from './resolvers/blog.resolver';
import { BlogService } from './services/blog.service';

@Module({
  imports:[ShareServiceModule],
  providers: [BlogResolver, BlogService],
})
export class BlogModule {}
