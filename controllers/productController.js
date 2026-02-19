import productModel from "../models/productModel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// add product item
const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Get the Cloudinary file URL
    const imageUrl = req.file.path;

    // Create a new product
    const product = new productModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imageUrl, // Save the Cloudinary URL
    });

    await product.save();
    res.status(200).json({ success: true, message: "Product Added", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Error saving product" });
  }
};

// all product list
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove product
const removeProduct = async (req, res) => {
  try {
    // Find the product by ID
    const product = await productModel.findById(req.body.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Extract the public ID from the image URL
    const imageUrl = product.image;
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0]; // Extract public_id from URL

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(`products/${publicId}`);

    // Delete the product from the database
    await productModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Error removing product" });
  }
};

export { addProduct, listProduct, removeProduct };
