import { ObjectType, Field, extend } from '@nestjs/graphql';
import { Blog } from '../../blog/objects/blog.object';

export interface UserInterface {
  _id?: string;
  name: string;
  // blogs?: Blog[];
}
export interface GetUserInterface {
  _id?: string | RegExp;
  name?: string | RegExp;
}

@ObjectType()
export class User {
  constructor(data: UserInterface) {
    this.id = data._id.toString();
    this.name = data.name;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  // @Field(() => [Blog], { nullable: true })
  // blogs: Blog[];
}
