const express = require("express");
const app = express();
// const router = express.Router();
const Purchase = require("../models/purchase.model");

// Get all purchases
app.get("/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (err) {
    console.error('Error fetching purchases:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new purchase
app.post("/purchases", async (req, res) => {
    const { productName, category, supplier, costPrice, quantity, expireDate, action } = req.body;

    try {
    const formattedExpireDate = new Date(expireDate).toISOString().split('T')[0];

    const purchase = new Purchase({
    productName,
    category,
    supplier,
    costPrice,
    quantity,
    expireDate: formattedExpireDate,
    action
  });

    const newPurchase = await purchase.save();
    res.status(201).json(newPurchase);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a purchase
app.delete("/purchases/:id", async (req, res) => {
  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.json({ message: "Purchase deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a purchase
app.put("/purchases/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPurchase = await Purchase.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.json({ message: "Purchase updated successfully", updatedPurchase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
