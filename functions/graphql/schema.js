// require all dependencies to set up server
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const resolvers = require('./resolvers');

// cors allows our server to accept requests from different origins
const cors = require("cors");

function configureServer() {

  // invoke express to create our server
  const app = express();

  //use the cors middleware
  app.use(cors());

  // Simple graphql schema
  const schema = gql`
    input CategoryCreateInput {
      name: String
    }
    input CategoryInput {
      id: String!
      name: String
    }
    input CategoryDeleteInput {
      id: String!
    }
    type Category {
      id: String!
      name: String
    }
    type Query {
      categories: [Category]
    }
    type Mutation {
      createCategory(input: CategoryCreateInput!): Category
      updateCategory(input: CategoryInput): Category
      deleteCategory(input: CategoryDeleteInput): Category
    }
  `;

  const server = new ApolloServer({
      typeDefs: schema,
      resolvers,
      introspection: true,
      playground: true
  });

  // now we take our newly instantiated ApolloServer and apply the   // previously configured express application
  server.applyMiddleware({ app });
      
  // finally return the application
  return app;
}

module.exports = configureServer;
