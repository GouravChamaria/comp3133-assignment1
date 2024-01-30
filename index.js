// src/index.js

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/userResolvers');

// Create an Express app
const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://GouravChamaria:1234@cluster0.wdagdjh.mongodb.net/comp3133_assigment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

// Start Apollo Server
async function startServer() {
  await server.start();

  // Apply middleware to express app
  server.applyMiddleware({ app });

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Call the async function to start the server
startServer();
