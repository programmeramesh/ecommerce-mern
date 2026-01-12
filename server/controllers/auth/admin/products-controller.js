const { imageUploadUtil } = require("../../../helpers/cloudinary");
const Product = require("../../../models/product");

const handleImageUpload = async (req, res) => {
  try {
    console.log("File received:", req.file);

    if (!req.file) {
      return res.json({
        success: false,
        message: "No file uploaded",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error details:", error);
    res.json({
      success: false,
      message: "Internal error: " + error.message,
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newlyCreatedProduct,
    });
    if (
      !image ||
      !title ||
      !description ||
      !category ||
      !brand ||
      !price ||
      !salePrice ||
      !totalStock
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
  } catch (error) {
    console.log("Error details:", error);
    res.status(500).json({
      success: false,
      message: "Internal error: " + error.message,
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: listOfProducts,
    });
  } catch (error) {
    console.log("Error details:", error);
    res.status(500).json({
      success: false,
      message: "Internal error: " + error.message,
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    let findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock =
      totalStock === "" ? 0 : totalStock || findProduct.totalStock;
    await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findProduct,
    });
  } catch (error) {
    console.log("Error details:", error);
    res.status(500).json({
      success: false,
      message: "Internal error: " + error.message,
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.log("Error details:", error);
    res.status(500).json({
      success: false,
      message: "Internal error: " + error.message,
    });
  }
};
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
