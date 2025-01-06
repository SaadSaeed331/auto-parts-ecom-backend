const { default: mongoose } = require("mongoose");

const signSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    profilepic:{
        type:String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
})

module.exports = mongoose.model("userdata",signSchema)