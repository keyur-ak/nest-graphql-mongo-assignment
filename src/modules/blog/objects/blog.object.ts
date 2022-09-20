import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/users/objects/User.object';

@ObjectType()
export class Blog {
  constructor(data: any) {
    this.id = data._id.toString();
    this.title = data.title;
    this.description = data.description;
    this.user_id = data.user_id;
    this.timestamp = data.timestamp;
    if (typeof data.user === 'object') {
      data.user = Array.isArray(data.user) ? data.user[0] : data.user;
      this.user = new User(data.user);
    }
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  user_id: string;

  @Field(() => Number)
  timestamp: number;

  @Field(() => User, { nullable: true })
  user: User;
}
