import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Blog {
  constructor(data: any) {
    this.id = data._id.toString();
    this.title = data.title;
    this.description = data.description;
  }

  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;
}
