import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../objects/User.object';
import { CreateUserInput } from '../dto/create-user.input';
import { BlogService } from '../../blog/services/blog.service';
import { Blog } from 'src/modules/blog/objects/blog.object';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly userService: UserService,
    private readonly blogSer: BlogService,
  ) {}

  @Query(() => User)
  async users(@Args('id') id: string) {
    return this.userService.getOneUser(id);
  }
  @Query(() => [User])
  async getAllUsers() {
    return this.userService.GetAllUser();
  }

  @ResolveField(() => [Blog], {
    name: 'blogs',
  })
  async Getblogs(@Parent() user: User) {
    const { id } = user;
    return this.blogSer.findAll(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('user')
    createUser: CreateUserInput,
  ) {
    return this.userService.create(createUser);
  }
}
