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
  async getOneUser(id: string) {
    const data = await this.collection.findOne({
      _id: id,
    });
    if (data === null) {
      throw new HttpException('User Not Found', 400);
    }
    return new User(data);
  }
  async GetAllUser(){
    const users = await this.collection.find().toArray();
    return users.map(u=>new User(u));
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
