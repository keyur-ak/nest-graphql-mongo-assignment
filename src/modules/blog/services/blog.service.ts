import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from '../dto/create-blog.input';
import { MongoDbService } from '../../../database/mongo-db.service';
import { Collection, Document, ObjectId } from 'mongodb';
import { Blog } from '../objects/blog.object';
import * as uuid from 'uuid';

@Injectable()
export class BlogService {
  collection: Collection<Document>;
  constructor(mongoDbService: MongoDbService) {
    this.collection = mongoDbService.db.collection('blog');
  }

  async findAll() {
    const data = await this.collection.find().toArray();
    console.log(data);
    return data.map((entity) => new Blog(entity));
  }

  async create(createBlogInput: CreateBlogInput) {
    const data = {
      ...createBlogInput,
      _id: uuid.v4(),
    };

    await this.collection.insertOne(data);
    return new Blog(data);
  }
}
