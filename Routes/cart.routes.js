const express = require('express');
const { orderArray, orderhistory,getadmindata, setstatus, makePayment} = require("../Controllers/cart.controller")
const {isLoggedin} = require("../middleware/isLoggedin");
const { isAdmin } = require('../middleware/isAdmin');
const cart = express.Router();

cart.post("/orderArray",isLoggedin, orderArray)
cart.get("/orderhistory",isLoggedin, orderhistory)
cart.get("/getData",isLoggedin,isAdmin,getadmindata)
cart.patch("/setstatus",isLoggedin,isAdmin,setstatus)

cart.post("/payment",isLoggedin, makePayment)


module.exports = cart;