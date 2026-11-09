const User = require("../models/userModel.js");
const Product = require("../models/productModels.js");

const addUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  const user = await User.create({
    name,
    email,
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
};

const getUser = async (req, res) => {
  const email = req.params.id;

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    user: user,
  });
};

const addToCart = async (req, res) => {
  const userId = req.params.userId;
  const { productId } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const existingProduct = user.cart.find((item) => {
    return item.productId.toString() === productId;
  });

  if (existingProduct) {
    existingProduct.quantity = existingProduct.quantity + 1;
  } else {
    user.cart.push({
      productId: productId,
      quantity: 1,
    });
  }

  await user.save();

  res.status(200).json({
    message: "Product added to cart",
    cart: user.cart,
  });
};

const getCart = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).populate("cart.productId");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "Cart fetched successfully",
    cart: user.cart,
  });
};

const removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.cart = user.cart.filter((item) => {
    return item.productId.toString() !== productId;
  });

  await user.save();

  res.status(200).json({
    message: "Product removed from cart",
    cart: user.cart,
  });
};

module.exports = {
  addUser,
  getUser,
  addToCart,
  getCart,
  removeFromCart,
};
