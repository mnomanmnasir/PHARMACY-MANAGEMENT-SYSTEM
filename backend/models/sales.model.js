const mongoose = require("mongoose");


const saleSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
