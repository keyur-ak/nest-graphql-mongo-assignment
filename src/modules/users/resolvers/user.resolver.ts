import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { User } from '../objects/User.object';
import { CreateUserInput } from '../dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(@Args('id', { nullable: true }) id?: string) {
    if (id) {
      const b = await this.userService.getOneUser(id);
      return b; 
    } else {
      return this.userService.getAll();
    }
  }

  @Mutation(() => User)
  createUser(
    @Args('user')
    createUser: CreateUserInput,
  ) {
    return this.userService.create(createUser);
  }
}
