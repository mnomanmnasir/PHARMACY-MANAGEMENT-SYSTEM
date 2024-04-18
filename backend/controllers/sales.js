const Sale = require('../models/sales.model');

// Create a new sale
exports.createSale = async (req, res) => {
  try {
    const { productName, quantitySold, unitPrice, totalPrice, customerName } = req.body;
    const sale = new Sale({ productName, quantitySold, unitPrice, totalPrice, customerName });
    await sale.save();
    res.status(201).json({ message: 'Sale created successfully', sale });
  } catch (error) {
    console.error('Error creating sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all sales
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findById(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    console.error('Error fetching sale by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update sale by ID
exports.updateSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, quantitySold, unitPrice, totalPrice, customerName } = req.body;
    const updatedSale = await Sale.findByIdAndUpdate(id, { productName, quantitySold, unitPrice, totalPrice, customerName }, { new: true });
    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json({ message: 'Sale updated successfully', sale: updatedSale });
  } catch (error) {
    console.error('Error updating sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete sale by ID
exports.deleteSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await Sale.findByIdAndDelete(id);
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json({ message: 'Sale deleted successfully', sale: deletedSale });
  } catch (error) {
    console.error('Error deleting sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
