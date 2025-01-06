const signSchema = require("../models/userdata.model")
const bcrypt = require('bcrypt')
const { createToken } = require("../utils/createToken")
const nodemailer= require("nodemailer")

const postData = async(req,res)=>{
    // console.log("postt data");
    
    var _email=req.body.email
    var resp = await signSchema.findOne({email:_email})
    
    
    if(!resp){

        /// hash/encrypt password
        // var hashPassword = await bcrypt.hash(req.body.password, 10)
        // req.body.password = hashPassword

        var hashPassword = await bcrypt.hash(req.body.password,10)
        req.body.password = hashPassword

        var resp = await signSchema.create(req.body)
        res.send({msg:"Account registered" })
    }
    else{
        res.send({msg:"Account already registered"})
    }

}

const checkData=async(req,res)=>{

    var _email=req.body.email
    var _password=req.body.password


    var resp = await signSchema.findOne({email:_email})
    if(!resp){
        return res.send({msg:"Invalid Email"})
    }

    // hash    12345 ->  ksjdfhkwjhr3iy2378746ieykgkdhsfwhr32i7273
    // compare     ksjdfhkwjhr3iy2378746ieykgkdhsfwhr32i7273 == 12345    -> true/false
    // {
    //     email: "asdadasd@gmail.com",
    //     password: "12345"
    // }


    if(!await bcrypt.compare(_password, resp.password)){
        return res.send({msg:"Invalid Pasword"})
    }
    

    //
    const token = createToken(resp._id)
    console.log(token, "...")
    
    return res.send({msg:"login sucessfull", user: resp,token:token})
}

const changepassword = async (req, res) => {
    // console.log("working");
    var pasold = req.body.passwordold
    var pasnew = req.body.passwordnew
    var _password = req.body.password

    var userdata = req.userData


    var resp = await signSchema.findOne({ email: userdata.email })

    // console.log(resp.password,".......data");
    if (! await bcrypt.compare(pasold, resp.password)) {
        return res.send({ msg: "Incorrect password" })
    } else {
        var resp = await signSchema.findOneAndUpdate(
            { id: req.body.id },
            { $set: { password: await bcrypt.hash(pasnew, 10) } },
            { new: true }
        )
        res.send({ msg: "Password updated sucessfully" })
    }
}

const sendmail = async (req, res) => {
    var email = req.body.email
    // console.log(req.body.email);

    var user = await signSchema.findOne({ email: email })

    if (!user) {
        return res.send({ msg: "User Not Found!" })
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Outlook SMTP server
        port: 587, // Outlook SMTP port
        secure: false, // false for TLS - as a boolean not string - if you don't have a certificate
        auth: {
            user: 'meetsaad331@gmail.com',
            pass: 'fxgj fkcd vzaq slla'
        }
    });

    var token = createToken(user._id)

    const url = `http://localhost:5173/set-new-password/${token}`

    try {
        await transporter.sendMail({
            from: "meetsaad331@gmail.com",
            to: email,
            subject: "Forget Password",
            text: `click here to reset your password ${url}`
        });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }



}

const sendpass = async (req, res) => {
    var pasnew = req.body.password
    // console.log(pasnew , ".....passnew");

    var resp = await signSchema.findOneAndUpdate(
        { _id: req.userData._id },
        { $set: { password: await bcrypt.hash(pasnew, 10) } },
        { new: true }
    )
    res.send({ msg: "password renewed sucessfully", error: false })
}

const getuserdata = async (req, res) => {
    var resp = await signSchema.find().populate("posts")
    res.send(resp)
    // console.log(resp);

    // get user
    // posts.push()
    // user.save()
    const user =await signSchema.find(req.userData)

    // console.log(req.userData);
    // console.log(user, ".......user");

}


module.exports= {postData , checkData,changepassword, sendmail, sendpass, getuserdata }