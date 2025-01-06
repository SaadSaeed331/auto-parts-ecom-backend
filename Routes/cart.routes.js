const express = require('express');
const { orderArray, orderhistory} = require("../Controllers/cart.controller")
const {isLoggedin} = require("../middleware/isLoggedin")
const cart = express.Router();

cart.post("/orderArray",isLoggedin, orderArray)
cart.get("/orderhistory",isLoggedin, orderhistory)

module.exports = cart;