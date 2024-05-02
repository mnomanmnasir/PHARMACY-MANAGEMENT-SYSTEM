const User = require("../models/register.model");
const createError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserLogin = require("../models/login.model");

// REGISTER USER

exports.register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError("User already Exists", 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // ASSIGN JWT ( JSON WEB TOKEN ) TO USER
    const token = jwt.sign({ id: newUser._id }, "noman@12345", {
      expiresIn: "1h", // Token expiry time
    });

    res.status(201).json({
      success: "success",
      message: "User Registered Successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {

    console.log("Request Body:", req.body); // Log the entire request body

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return next(new createError("User not found", 404));
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Invalid password for email:", email);
      return next(new createError("Incorrect Email or Password", 401));
    }


     // Save the email and password to MongoDB
     const loginData = new UserLogin({
        email: user.email,
        password: user.password, // You may want to reconsider storing the password in plain text
      });
      await loginData.save();

    // ASSIGN JWT ( JSON WEB TOKEN ) TO USER
    const token = jwt.sign({ id: user._id }, "noman@12345", {
      expiresIn: "1h", // Token expiry time
    });
    
    // Save the token to the user document
    user.token = token;
    await user.save();

    
    res.status(200).json({
      success: "success",
      token: token,
      message: "Logged In Successfully",
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
