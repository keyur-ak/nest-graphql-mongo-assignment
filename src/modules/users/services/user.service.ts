import { HttpException, Injectable } from '@nestjs/common';
import { MongoDbService } from '../../../database/mongo-db.service';
import { Collection, Document, ObjectId } from 'mongodb';
import { GetUserInterface, User, UserInterface } from '../objects/User.object';
import * as uuid from 'uuid';
import { CreateUserInput } from '../dto/create-user.input';

const UsersCollectionName = 'users';

@Injectable()
export class UserService {
  collection: Collection<UserInterface>;
  constructor(mongoDbService: MongoDbService) {
    this.collection = mongoDbService.db.collection(UsersCollectionName);
  }
  async GetUserDetails(userReq: GetUserInterface={}) {
    return this.collection
      .aggregate<UserInterface>([
        // userReq,
        {
          $match: userReq,
        },
        {
          $lookup: {
            from: 'blogs',
            localField: '_id',
            foreignField: 'user_id',
            as: 'blogs',
          },
        },
      ])
      .toArray();
  }
  async getOneUser(id: string) {
    const data = await this.GetUserDetails({ _id: id });
    if (data === null || data.length === 0) {
      throw new HttpException('User Not Found', 400);
    }
    // const user = 
    return [new User(data[0])];
  }
  async getAll() {
    const data = await this.GetUserDetails();
    return data.map((entity) => new User(entity));
  }
  async create(createUser: CreateUserInput) {
    const data = {
      ...createUser,
      _id: uuid.v4(),
    };
    await this.collection.insertOne(data);
    return new User(data);
  }
}
