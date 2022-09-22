import { Module } from '@nestjs/common';
import { BlogService } from '../modules/blog/services/blog.service';
import { UserService } from '../modules/users/services/user.service';

@Module({
  providers: [UserService, BlogService],
  exports: [UserService, BlogService],
})
export class ShareServiceModule {}
