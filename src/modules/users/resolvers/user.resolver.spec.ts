import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './user.resolver';
import { UserService } from '../services/user.service';

describe(UsersResolver.name, () => {
  let blogServiceMock: Partial<Record<keyof UserService, jest.Mock>>;
  let resolver: UsersResolver;

  beforeEach(async () => {
    blogServiceMock = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver],
    })
      .useMocker((token) => {
        switch (token) {
          case UserService:
            return blogServiceMock;
        }
        return undefined;
      })
      .compile();

    resolver = module.get(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  /**
   * @Todo: Implement tests for the resolver properties
   */
});
