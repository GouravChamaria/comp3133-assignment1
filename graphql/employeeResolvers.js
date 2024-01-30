// graphql/employeeResolvers.js

const EmployeeModel = require('../models/employeeModel');

const employeeResolvers = {
  Query: {
    getAllEmployees: async () => {
      // Implement logic to fetch all employees
      const employees = await EmployeeModel.find();
      return employees;
    },
    searchEmployeeByEid: async (_, { eid }) => {
      // Implement logic to fetch an employee by ID
      const employee = await EmployeeModel.findById(eid);
      return employee;
    },
  },
  Mutation: {
    addNewEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
      // Implement logic to add a new employee
      const newEmployee = await EmployeeModel.create({
        first_name,
        last_name,
        email,
        gender,
        salary,
      });
      return newEmployee;
    },
    updateEmployeeByEid: async (_, { eid, first_name, last_name, email, gender, salary }) => {
      // Implement logic to update an employee by ID
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        eid,
        { first_name, last_name, email, gender, salary },
        { new: true }
      );
      return updatedEmployee;
    },
    deleteEmployeeByEid: async (_, { eid }) => {
      // Implement logic to delete an employee by ID
      const deletedEmployee = await EmployeeModel.findByIdAndRemove(eid);
      return deletedEmployee;
    },
  },
};

module.exports = employeeResolvers;
