const mongoose = require("mongoose");


// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }
}); 


// Create User model
const User = mongoose.model("Login", userSchema);

module.exports = User;
