import {v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary=async (localfilePath)=>{
    try {
        if(!localfilePath)return null

        const response=await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto"
        })

        console.log("file uploaded on cloudinary\n")
        fs.unlinkSync(localfilePath);
        return response;
        
    } catch (error) {
        console.log("CLOUDINARY ERROR :",error)
        fs.unlinkSync(localfilePath)//remove locally saved filed
        return null;
        
    }
}


export {uploadOnCloudinary}