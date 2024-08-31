import Inventory from '../models/inventories.model'



// Create a new inventory item
exports.createInventoryItem = async (req, res) => {
  try {
    const { productName, category, quantity, price, description } = req.body;
    const inventoryItem = new Inventory({ productName, category, quantity, price, description });
    await inventoryItem.save();
    res.status(201).json({ message: 'Inventory item created successfully', inventoryItem });
  } catch (error) {
    console.error('Error creating inventory item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all inventory items
exports.getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get inventory item by ID
exports.getInventoryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryItem = await Inventory.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json(inventoryItem);
  } catch (error) {
    console.error('Error fetching inventory item by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update inventory item by ID
exports.updateInventoryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, category, quantity, price, description } = req.body;
    const updatedInventoryItem = await Inventory.findByIdAndUpdate(id, { productName, category, quantity, price, description }, { new: true });
    if (!updatedInventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json({ message: 'Inventory item updated successfully', inventoryItem: updatedInventoryItem });
  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete inventory item by ID
exports.deleteInventoryItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInventoryItem = await Inventory.findByIdAndDelete(id);
    if (!deletedInventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.status(200).json({ message: 'Inventory item deleted successfully', inventoryItem: deletedInventoryItem });
  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
