const graphqlTools = require('graphql-tools');
const resolvers = require('./resolvers');

const schema = `
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
module.exports = graphqlTools.makeExecutableSchema({
  typeDefs: schema,
  resolvers
});