const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    prdtid: {
        type: Number
    },
    prdtimg: {
        type: String
    },
    brand: {
        type: String
    },
    catagory: {
        type: String
    },
    rewardpoints: {
        type: Number
    },
    availability: {
        type: String
    },
    
    
})

module.exports = mongoose.model("user", UserSchema)