import { Test, TestingModule } from '@nestjs/testing';
import { BlogResolver } from './blog.resolver';
import { BlogService } from '../services/blog.service';
import { ShareServiceModule } from '../../../shared/share-service.module';
import { MongoModule } from '../../../database/mongo-db.module';
import { Blog } from '../objects/blog.object';

describe(BlogResolver.name, () => {
  let blogServiceMock: Partial<Record<keyof BlogService, jest.Mock>>;
  let resolver: BlogResolver;

  beforeEach(async () => {
    blogServiceMock = {};
    const module: TestingModule = await Test.createTestingModule({
      imports:[ShareServiceModule,MongoModule], 
      providers: [BlogResolver,BlogService],
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

  it('should be defined', async () => {
    expect(resolver).toBeDefined();
    // const  = await resolver.blogs();
  });
  it('Should be able to Get all Blogs',async ()=>{
    const blogs =  await resolver.blogs();
    blogs.forEach(b=>expect(b instanceof Blog).toBeTruthy());
  },10000);
  it('Should Insert And Delete Blog',async ()=>{
    const blog =  await resolver.createBlog({
      description:"Mock DESC",
      title:"Mock Title",
      user_id:"demouser"
    });
    expect(blog instanceof Blog).toBeTruthy();
    const deletedBlog = await resolver.deleteBlog(blog.id);
    expect(deletedBlog instanceof Blog).toBeTruthy();
  },10000);
  /**
   * @Todo: Implement tests for the resolver properties
   */
});
