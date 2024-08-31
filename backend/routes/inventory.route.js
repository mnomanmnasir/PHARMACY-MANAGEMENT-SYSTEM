const express = require("express");
const app = express();
// const router = express.Router();
const Inventory = require("../models/inventories.model");


// Get all inventory items
app.get("/inventories", async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.json(inventoryItems);
  } catch (err) {
    console.error('Error submitting form:', err);

    res.status(500).json({ message: err.message });
  }
});


// Create a new inventory item
app.post("/inventories", async (req, res) => {
  const inventoryItem = new Inventory({
    productName: req.body.productName,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    const newInventoryItem = await inventoryItem.save();
    res.status(201).json(newInventoryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete an inventory item
app.delete("/inventories/:id", async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.json({ message: "Inventory item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// Update an inventory item
app.put("/inventories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.json({ message: "Inventory item updated successfully", updatedItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;



