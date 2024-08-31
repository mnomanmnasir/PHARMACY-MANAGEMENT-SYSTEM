const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String, required: true },
});
// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
