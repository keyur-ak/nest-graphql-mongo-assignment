import { Module } from '@nestjs/common';
import { ShareServiceModule } from '../../shared/share-service.module';
import { BlogResolver } from './resolvers/blog.resolver';

@Module({
  imports:[ShareServiceModule],
  providers: [BlogResolver],
})
export class BlogModule {}
