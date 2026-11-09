
const Product = require('../models/productModels.js');

// Add Product
const addProduct = async (req, res) => {

    const { title, price, description, imgUrl } = req.body;

    if (!title || price === undefined || !description || !imgUrl) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const products = await Product.create({
        title,
        price,
        description,
        imgUrl
    });

    res.status(201).json({
        message: "Product has been created",
        products
    });
};


// Get All Products
const getProducts = async (req, res) => {

    const products = await Product.find();

    return res.status(200).json({
        message: "Product Fetched",
        products
    });
};


// Get Product By ID
const getProductById = async (req, res) => {

    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    return res.status(200).json({
        message: "Product Fetched",
        product
    });
};


// Update Product
const updateProduct = async (req, res) => {

    const id = req.params.id;

    const { title, price, description, imgUrl } = req.body;

    if (!title || price === undefined || !description || !imgUrl) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const product = await Product.findByIdAndUpdate(
        id,
        { title, price, description, imgUrl },
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    return res.status(200).json({
        message: "Product Updated",
        product
    });
};


// Delete Product
const deleteProduct = async (req, res) => {

    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    return res.status(200).json({
        message: "Product deleted successfully"
    });
};


module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
