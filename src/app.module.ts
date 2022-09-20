import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongoModule } from './database/mongo-db.module';
import { BlogModule } from './modules/blog/blog.module';
import { UsersModule } from './modules/users/users.module';
import { ShareServiceModule } from './shared/share-service.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    MongoModule,
    BlogModule,
    UsersModule,
    ShareServiceModule,
  ],
})
export class AppModule {}
