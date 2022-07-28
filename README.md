# Assignment: Nestjs & Graphql

There exists a sample boilerplate code in this repository

- Mutation to create a new blog
- Query to read all blogs through mu

### Assignment

- Create mutation resolver to create a `User { id, name }` and a `query` to find a user by their id
- Update `createBlog` mutation to accept a user Id, and to be saved alongside other blog data
- Create `user` resolver for `blog` node such that we can access user's id and name from the graphql

```graphql
query {
  blogs {
    id
    title
    user {
      id
      name
    }
  }
}
```

- Create `blogs` resolver for `user` node such that we can access all blogs from that user

```graphql
    query {
        user(userId) {
            id
            name
            blogs {
                id
                title
            }
        }
    }
```

- Create a mutation to delete the blog (_Note: delete user mutation is not required_)

- Implement unit tests for resolvers and services. (e2e tests for app is optional)

### Tips:

- Be Typesafe
- Keep it simple. It is always a good idea to create a new file instead of jamming everything in one file
- Understand terms used in the boilerplate
  - Module, (Providers & imports): [Reference Docs](https://docs.nestjs.com/modules)
  - Service : [Reference Docs](https://docs.nestjs.com/providers#services)
  - Unit test and mocking: [Reference Docs](https://docs.nestjs.com/fundamentals/testing#auto-mocking)

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start:dev
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e
```
