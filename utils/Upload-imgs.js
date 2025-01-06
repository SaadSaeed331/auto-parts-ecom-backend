const cloudinary = require("cloudinary").v2

cloudinary.config(
    {
        cloud_name: 'dejkzudwt', 
    api_key: '397396227351227', 
    api_secret: '58N9skkMiEraW6JHtIOwX-v0WhQ' 
    }
)

const UploadFiles = async (filepath)=>{
    try{
        var files = await cloudinary.uploader.upload(filepath)
        console.log(files.secure_url,'images');
        if(files){
            return files.secure_url
        }
    }catch(error){

    }

}


module.exports= UploadFiles