// graphql/employeeTypes.js

const { gql } = require('apollo-server-express');

const employeeTypes = gql`
  type Employee {
    _id: ID
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
  }

  type Query {
    getAllEmployees: [Employee]
    searchEmployeeByEid(eid: ID!): Employee
  }

  type Mutation {
    addNewEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee

    updateEmployeeByEid(
      eid: ID!
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      salary: Float!
    ): Employee

    deleteEmployeeByEid(eid: ID!): Employee
  }
`;

module.exports = employeeTypes;
