// graphql/userTypes.js

const { gql } = require('apollo-server-express');

const userTypes = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(usernameOrEmail: String!, password: String!): User
  }
`;

module.exports = userTypes;
