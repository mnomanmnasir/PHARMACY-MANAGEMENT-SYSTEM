const User = require("../models/register.model");
const createError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || 'noman@12345';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh@noman@12345';

// REGISTER USER
exports.register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // ASSIGN JWT AND REFRESH TOKEN TO USER
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: newUser._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Save the refresh token to the user document
    newUser.token = token;
    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.status(201).json({
      success: "success",
      message: "User Registered Successfully",
      token,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new createError("User not found", 404));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new createError("Incorrect Email or Password", 401));
    }

    // ASSIGN JWT AND REFRESH TOKEN TO USER
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Save the refresh token to the user document
    user.token = token;
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      success: "success",
      token,
      refreshToken,
      message: "Logged In Successfully",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT USER
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return next(new createError("Refresh token is required", 400));
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
      return next(new createError("User not found", 404));
    }

    // Invalidate the refresh token
    user.refreshToken = null;
    await user.save();

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
