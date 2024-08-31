const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
    set: function (value) {
      // Parse the incoming date string and convert it to a Date object
      return new Date(value);
    },
  },

});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
