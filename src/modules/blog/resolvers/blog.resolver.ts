import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from '../services/blog.service';
import { Blog } from '../objects/blog.object';
import { CreateBlogInput } from '../dto/create-blog.input';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Query(() => [Blog])
  blogs() {
    return this.blogService.findAll();
  }

  @Mutation(() => Blog)
  createBlog(
    @Args('input')
    createBlogInput: CreateBlogInput,
  ) {
    return this.blogService.create(createBlogInput);
  }

  // @TODO: Create mutation for create Blog
  // @TODO: Create a query to get all blogs
  // @TODO: Create a query to get blog by its id
}
