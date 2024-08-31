const express = require('express');
// const router = express.Router();
const app = express();

const Sale = require('../models/sales.model');

// POST route to submit a new sale
app.post('/sales', async (req, res) => {
  try {
    // Create a new sale document
    const newSale = new Sale(req.body);

    // Save the sale data to the database
    await newSale.save();

    res.status(201).json({ message: 'Sale submitted successfully', status: true });
  } catch (error) {
    console.error('Error submitting sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to fetch all sales
app.get('/sales', async (req, res) => {
  try {
    // Fetch all sales from the database
    const sales = await Sale.find();

    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT route to update a sale by ID
app.put('/sales/:id', async (req, res) => {
  try {
    // Extract the ID parameter from the request URL
    const { id } = req.params;

    // Find the sale by ID and update it with the new data
    const updatedSale = await Sale.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSale) {
      // If the sale with the given ID doesn't exist
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({ message: 'Sale updated successfully', updatedSale });
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE route to delete a sale by ID
app.delete('/sales/:id', async (req, res) => {
  try {
    // Extract the ID parameter from the request URL
    const { id } = req.params;

    // Find the sale by ID and delete it
    const deletedSale = await Sale.findByIdAndDelete(id);

    if (!deletedSale) {
      // If the sale with the given ID doesn't exist
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json({ message: 'Sale deleted successfully', deletedSale });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
