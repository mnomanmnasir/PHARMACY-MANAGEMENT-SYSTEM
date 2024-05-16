const Purchase = require('../models/purchase.model');

// Create a new purchase
exports.createPurchase = async (req, res) => {
  try {
    const { productName, category, supplier, costPrice, quantity, expireDate, action } = req.body;
    // Parse and format the expireDate to ensure it's in YYYY-MM-DD format
    const formattedExpireDate = new Date(expireDate).toISOString().split('T')[0];
    const purchase = new Purchase({ productName, category, supplier, costPrice, quantity, expireDate: formattedExpireDate, action });
    await purchase.save();
    res.status(201).json({ message: 'Purchase created successfully', purchase });
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update purchase by ID
exports.updatePurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, category, supplier, costPrice, quantity, expireDate, action } = req.body;
    // Parse and format the expireDate to ensure it's in YYYY-MM-DD format
    const formattedExpireDate = new Date(expireDate).toISOString().split('T')[0];
    const updatedPurchase = await Purchase.findByIdAndUpdate(id, { productName, category, supplier, costPrice, quantity, expireDate: formattedExpireDate, action }, { new: true });
    if (!updatedPurchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }
    res.status(200).json({ message: 'Purchase updated successfully', purchase: updatedPurchase });
  } catch (error) {
    console.error('Error updating purchase:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
