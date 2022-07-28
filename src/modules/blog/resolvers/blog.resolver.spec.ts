import { Test, TestingModule } from '@nestjs/testing';
import { BlogResolver } from './blog.resolver';
import { BlogService } from '../services/blog.service';

describe(BlogResolver.name, () => {
  let blogServiceMock: Partial<Record<keyof BlogService, jest.Mock>>;
  let resolver: BlogResolver;

  beforeEach(async () => {
    blogServiceMock = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogResolver],
    })
      .useMocker((token) => {
        switch (token) {
          case BlogService:
            return blogServiceMock;
        }
        return undefined;
      })
      .compile();

    resolver = module.get(BlogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  /**
   * @Todo: Implement tests for the resolver properties
   */
});
