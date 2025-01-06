const jwt = require("jsonwebtoken")

const createToken = (userId) => {

    console.log(process.env.SECRET_KEY, "key");
    
    var token = jwt.sign(
        {userId:userId},
        process.env.SECRET_KEY,
        {expiresIn: "7d"}
    )
    return token
}

module.exports = {createToken}