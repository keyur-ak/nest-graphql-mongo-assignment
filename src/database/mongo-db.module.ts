import { Global, Module, OnModuleDestroy } from '@nestjs/common';
import { mongoClientFactory } from './mongo-client.factory';
import { MongoDbService } from './mongo-db.service';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  providers: [
    MongoDbService,
    {
      provide: MongoClient,
      useFactory: mongoClientFactory,
    },
  ],
  exports: [MongoDbService],
})
export class MongoModule implements OnModuleDestroy {
  constructor(private readonly client: MongoClient) {}
  async onModuleDestroy() {
    await this.client.close();
  }
}
