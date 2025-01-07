const orderModels = require("../models/order.models")
const signSchema = require("../models/userdata.model")
const stripe = require("stripe")("sk_test_51QeZeM4F3IBPvvICrgL2T3uIpQBNWRBAYDNoNWjqqcmWeOBdc0QCvVRkJfafFM0KAbbkG7LOOfTB3ktPmRMclk1L004uPTVUnG")

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
    // console.log(obj);

}

const orderhistory = async (req, res) => {
    var resp = await orderModels.find({ costumerId: req.userData._id })
    res.send(resp)
    // console.log(resp);

}

const getadmindata = async (req, res) => {
    var resp = await orderModels.find()
    res.send(resp)
    // console.log(resp);
}

const setstatus = async (req, res) => {
    console.log(req.body);
    
    var resp = await orderModels.findByIdAndUpdate(req.body.id, {status: req.body.status})
    res.send(resp)
    console.log(resp);
    
}


const makePayment = async (req, res) => {
    const {products} = req.body;


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name,
                images:[product.prdtimg]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.quantity
    }));
 
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/sucess",
        cancel_url:"http://localhost:5173/cancel",
    });

    res.json({id:session.id})
}



module.exports = { orderArray, orderhistory,getadmindata ,setstatus, makePayment}