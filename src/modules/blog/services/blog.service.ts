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
    // this.create({
    //   title: 'apidjiapsdjpasdjpjkmoasd',
    //   user_id: 'efc7aa6d-5db2-42d7-9e00-5d39812100af',
    //   description: 'aopsidniapdjasd',
    // }).then((a) => {
    //   this.delete(a.id).then(console.log);
    // });
    // this.delete('aSDASDASDASDJNPOIANSD').then(console.log);
  }

  async findAll() {
    const data = await this.collection
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user',
          },
        },
      ])
      .toArray();
    return data.map((entity) => new Blog(entity));
  }

  async create(createBlogInput: CreateBlogInput) {
    const u = await this.userServ.GetUserDetails({
      _id: createBlogInput.user_id,
    });
    if (u === null) {
      throw new HttpException('Invalid User Id', 400);
    }
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
      throw new HttpException('No Blogs Found',400);
    }
    return new Blog(s);
  }
}
