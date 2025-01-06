const jwt = require("jsonwebtoken")
const signModels = require("../models/userdata.model")

const isLoggedin = async (req, res, next) => {

    const token = req?.headers?.authorization?.split(" ")[1]

    console.log(token, ".....token");

    if(!token){
        return res.send({message: "please Login first !", error: true})
    }


    var decodedData = jwt.verify(token, process.env.SECRET_KEY)

    var user = await signModels.findOne({_id: decodedData.userId})

    console.log(user, ".....user");
    if(!user){
        return res.send({message: "please Login first !", error: true})
    }
    console.log(token);

    req.userData = user

    next()

    //<<<<<<<<----------------  practice   ------------->>>>>>>>
    // const token = req?.headers?.authorization?.split(" ")[1]

    // if(!token){
    //     return res.send({message:"please Login First !",error:true})
    // }

    // var decodedData = jwt.verify(token,process.env.SECRET_KEY)
    // var user= await signModels.findOne({_id:decodedData.userId})
    // if(!user){
    //     return res.send({message:"please Login first !", error: true})
    // }

    // next()

}


module.exports = {isLoggedin}