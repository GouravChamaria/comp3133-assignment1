// models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
