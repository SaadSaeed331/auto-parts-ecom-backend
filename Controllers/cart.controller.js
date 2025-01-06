const orderModels = require("../models/order.models")
const signSchema = require("../models/userdata.model")

const orderArray = async (req, res) => {
    console.log(req.body)
    var costumername = req.body.user.name
    var costumerId = req.body.user._id
    var costumerEmail = req.body.user.email
    var items = req.body.qnty
    var totalprice = req.body.total
    var products = req.body.array
    var status = "pending"
    var obj = {
        costumername,
        costumerId,
        costumerEmail,
        items,
        totalprice,
        products,
        status
    }
    var resp = await orderModels.create(obj)
    console.log(obj);

}

const orderhistory = async (req, res) => {
    var resp = await orderModels.find({ costumerId: req.userData._id })
    res.send(resp)
    console.log(resp);

}
module.exports = { orderArray, orderhistory }