const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const upload = require("../middleware/upload");

router.post("/", async (req, res) => {
  try {
    const newItem = new Item({
      ...req.body,
      mainImage: "", 
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/upload-image/:id", upload.single("image"), async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/upload-gallery/:id", upload.array("images", 5), async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const imagePaths = req.files.map(file => file.filename);
    if(!item.images) item.images = []; 
    item.images.push(...imagePaths);
    await item.save();

    res.status(200).json({ message: "Images uploaded successfully", item });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.mainImage = req.file.filename;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
