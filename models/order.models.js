const { default: mongoose } = require("mongoose");

const orderSchema = mongoose.Schema({
    costumername:{
        type:String
    },
    costumerId:{
        type:mongoose.Schema.ObjectId,
        ref:"userdata"
    },
    costumerEmail:{
        type:String
    },
    items:{
        type:Number
    },
    totalprice:{
        type:Number
    },
    products:{
        type: [
            {
              prdtimg: {type:String},
              name:{type:String},
              price:{type:Number},
              quantity:{type:Number},  
            }
        ]
    },
    orderId:{
        type:String
    },
    status:{
        type:String
    }

})

module.exports = mongoose.model("order",orderSchema)