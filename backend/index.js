const express = require('express')
// import mongoose from "mongoose";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db")
// import authRouter from './routes/authRoute.js';
const authRouter  = require('./routes/authRoute')

dotenv.config();


// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors());


// Define routes
app.use('/api/auth', authRouter);
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/sales", require("./routes/sales.route"))
app.use("/api/v1/login", require("./routes/loginRoute"));
app.use('/api/v1/inventories', require("./routes/inventory.route"));
app.use('/api/v1/register', require("./routes/register.route"));
app.use('/api/v1/purchase', require("./routes/purchase.route"));


// app.use('/api/v1/forms', require("./routes/formRoutes"));


const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server is running in ${process.env.DEV_MODE} on PORT ${process.env.PORT}`
      .bgBlue.white
  );
});
