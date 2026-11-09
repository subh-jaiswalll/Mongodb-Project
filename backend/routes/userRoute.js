const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController.js");

router.post("/", userController.addUser);

router.get("/:id", userController.getUser);

router.post("/:userId/cart", userController.addToCart);

router.get("/:userId/cart", userController.getCart);

router.delete("/:userId/cart/:productId", userController.removeFromCart);

module.exports = router;
