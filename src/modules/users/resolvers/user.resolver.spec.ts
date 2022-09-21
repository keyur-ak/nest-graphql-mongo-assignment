import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './user.resolver';
import { ShareServiceModule } from '../../../shared/share-service.module';
import { MongoModule } from '../../../database/mongo-db.module';
import { User } from '../objects/User.object';

describe(UsersResolver.name, () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[ShareServiceModule,MongoModule], 
      providers: [UsersResolver],
    })
    .compile();

    resolver = module.get(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  it('should be able to get All User With Blogs',async ()=>{
    const users = await resolver.users();
    users.forEach(u=>expect(u instanceof User).toBeTruthy());
  });

  it('should be able to get a User With Blogs',async ()=>{
    const users = await resolver.users("demouser");
    users.forEach(u=>expect(u instanceof User).toBeTruthy());
  });
  /**
   * @Todo: Implement tests for the resolver properties
   */
});
