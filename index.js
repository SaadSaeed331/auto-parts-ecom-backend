const express = require("express")
const cors = require("cors")
const { default: mongoose } = require("mongoose")
const UserSchema = require("./models/prdt.models")
const form = require("./Routes/form.routes")
const { configDotenv } = require("dotenv")
const cart = require("./Routes/cart.routes")


configDotenv({path: "./.env"})

const app = express()
 app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://meetsaad331:saad331@cluster0.nra9gcy.mongodb.net/auto-speed")
.then(()=>{
    console.log("db connected");
})


app.get("/",async(req,res)=>{
    const data=await UserSchema.find()
    // console.log(data,"data")
    res.send(data)
})

app.post('/addData', async (req, res)=>{
    console.log(req.body);

    await UserSchema.create(req.body)

    res.send({message: "Item Added"})
    
})

app.get("/singleprdt/:id",async (req,res)=>{
    const data = await UserSchema.findOne({_id: req.params.id})
    res.send(data)
    // console.log(data,"data")
    })
    
    app.use("/",form)
    app.use("/",cart)
    
app.listen(4000,()=>{
    console.log("server running")
})