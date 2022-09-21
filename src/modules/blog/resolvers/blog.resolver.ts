import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BlogService } from '../services/blog.service';
import { Blog } from '../objects/blog.object';
import { CreateBlogInput } from '../dto/create-blog.input';
import { User } from '../../users/objects/User.object';
import { UserService } from '../../users/services/user.service';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(
    private readonly blogService: BlogService,
    private readonly userSer: UserService,
  ) {}

  @Query(() => [Blog])
  blogs() {
    return this.blogService.findAll();
  }
  @ResolveField(() => User, {
    name: 'user',
  })
  GetUserDetails(@Parent() blog: Blog) {
    const { user_id } = blog;
    return this.userSer.getOneUser(user_id);
  }
  @Mutation(() => Blog)
  deleteBlog(
    @Args('id')
    id: string,
  ) {
    return this.blogService.delete(id);
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
