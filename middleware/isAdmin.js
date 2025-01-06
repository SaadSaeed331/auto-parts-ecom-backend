const isAdmin = (req, res, next) => {
    if (req.userData?.role != "admin") {
        return res.send({ msg: "Un Authorized", error: true })
    }

    next()

}

module.exports = { isAdmin }

// we added another data field in schema in models.js file role
// role: {
//      type: String,
//      enum: ["user", "admin"],
//      default: "user"
// }
