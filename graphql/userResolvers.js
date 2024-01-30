const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const userResolvers = {
  Mutation: {
    signup: async (_, { username, email, password }) => {
      console.log('Received signup request with:', username, email, password);

      try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          console.log('User already exists:', existingUser);
          throw new Error('User already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = await UserModel.create({ username, email, password: hashedPassword });
        console.log('New user created:', newUser);

        return newUser;
      } catch (error) {
        console.error('Error during signup:', error.message);
        throw new Error('Error during signup');
      }
    },
    login: async (_, { usernameOrEmail, password }) => {
      // Implement login logic, check credentials and return the user object
      const user = await UserModel.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });

      if (!user) {
        console.log('User not found for login:', usernameOrEmail);
        throw new Error('User not found');
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        console.log('Incorrect password for login:', usernameOrEmail);
        throw new Error('Incorrect password');
      }

      console.log('User logged in:', user);
      return user;
    },
  },
};

module.exports = userResolvers;
