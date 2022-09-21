import { HttpException, Injectable } from '@nestjs/common';
import { CreateBlogInput } from '../dto/create-blog.input';
import { MongoDbService } from '../../../database/mongo-db.service';
import { Collection, Document } from 'mongodb';
import { Blog } from '../objects/blog.object';
import * as uuid from 'uuid';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class BlogService {
  collection: Collection<Document>;
  constructor(
    mongoDbService: MongoDbService,
    private readonly userServ: UserService,
  ) {
    this.collection = mongoDbService.db.collection('blogs');
  }

  async findAll(user_id?: string) {
    const data = await (user_id
      ? this.collection.find({
          user_id,
        })
      : this.collection.find()
    ).toArray();
    return data.map((entity) => new Blog(entity));
  }

  async create(createBlogInput: CreateBlogInput) {
    await this.userServ.getOneUser(createBlogInput.user_id);
    const data = {
      ...createBlogInput,
      _id: uuid.v4(),
      timestamp: Date.now(),
    };
    await this.collection.insertOne(data);
    return new Blog(data);
  }
  async delete(id: string) {
    const s = (
      await this.collection.findOneAndDelete({
        _id: id,
      })
    ).value;
    if (s === null) {
      throw new HttpException('No Blogs Found', 400);
    }
    return new Blog(s);
  }
}
