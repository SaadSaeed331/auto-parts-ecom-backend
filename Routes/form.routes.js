const express = require('express');
const { postData, checkData, checkaccount, changepassword, sendmail, sendpass, getuserdata } = require("../Controllers/form.controller")
const {isLoggedin} = require("../middleware/isLoggedin")
const form = express.Router();


form.post("/postData",postData)

form.post("/checkData",checkData)
// form.post("/checkaccount",checkaccount)

form.patch("/changepwd",isLoggedin,changepassword)

form.post("/sendmail",sendmail)

form.post("/sendpass",isLoggedin,sendpass)

form.get("/getuserdata",getuserdata)


module.exports = form;