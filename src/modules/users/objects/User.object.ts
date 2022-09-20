import { ObjectType, Field } from '@nestjs/graphql';
import { Blog } from 'src/modules/blog/objects/blog.object';

export interface UserInterface {
  _id?: string;
  name: string;
  blogs?: Blog[];
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
    if (data.blogs && Array.isArray(data.blogs)) {
      this.blogs = data.blogs.map((a) => new Blog(a));
    }
    // this.description = data.description;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [Blog], { nullable: true })
  blogs: Blog[];
}
