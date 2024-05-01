const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password with salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace plain password with hashed password
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

// Create User model
const User = mongoose.model("Login", userSchema);

module.exports = User;
