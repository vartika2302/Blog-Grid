const router = require("express").Router();
const Category = require("../models/Category");

//POST CATEGORY
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    return res.status(201).json(savedCat);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET CATEGORY
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
