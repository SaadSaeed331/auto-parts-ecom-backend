const multer = require("multer")

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        // console.log(file.originalname);
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})

module.exports = upload