const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    const newItem = new Item({
      title: req.body.title,
      description: req.body.description,
      condition: req.body.condition,
      category: req.body.category,
      isDonation: req.body.isDonation,
<<<<<<< HEAD
      mainImage: "", 
=======
      mainImage: "", // مفيش صورة بعد
>>>>>>> e6187289e5c8e2b6df654ac0dcba3631db3df171
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.uploadMainImage = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (req.file) {
      item.mainImage = req.file.filename;
      await item.save();
      return res.status(200).json({ message: "Image uploaded successfully", item });
    } else {
      return res.status(400).json({ message: "No image file provided" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      condition: req.body.condition,
      category: req.body.category,
      isDonation: req.body.isDonation,
    };

    if (req.file) {
      updatedData.mainImage = req.file.filename;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
