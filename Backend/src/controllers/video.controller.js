import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const publishVideo=asyncHandler(async (req,res)=>{

   
    const {title,description}=req.body
    if(!title){
        throw new apiError(404,"title is required")

    }
      if(!description){
        throw new apiError(404,"description is required")

    }

    const videoFileLocalpath=req.files.videoFile?.[0]?.path

    const thumbnailLocalPath=req.files.thumbnail?.[0]?.path
    if(!videoFileLocalpath){
        throw new apiError(400,"Video  is required")
    }
     if(!thumbnailLocalPath){
        throw new apiError(400,"Video  is required")
    }

     const videoFile= await uploadOnCloudinary(videoFileLocalpath)
   const thumbnail=await uploadOnCloudinary(thumbnailLocalPath)

   if(!videoFile){
    throw new apiError(401,"something went wrong while uploading videofile on cloudinary")
   }
   if(!thumbnail){
    throw new apiError(401,"something went wrong while uploading thumbnail on cloudinary")
   }

    const video =await Video.create({
    title,
    description,
    videoFile:videoFile.url,
    thumbnail:thumbnail.url,
    duration:videoFile.duration,
     owner:req.user._id

   }) 

   const videoUploaded= await Video.findById(video._id).select()

   if(!videoUploaded){
    throw new apiError(500,"something went wrong while creating video")
   }

   return res.status(200).json(new apiResponse(200,videoUploaded,"Video uploaded succesfully"))
      
    
})

const getAllVideos=asyncHandler(async (req,res)=>{
const {query}=req.query

const filter ={
     isPublished :true
}

if(query){
    filter.title={
        $regex :query,
        $options :"i"
    }
}

const videos= await Video.find(filter).populate("owner","username avatar")
.sort({createdAt :-1});

if(videos.length===0){
    return res.status(400).json(new apiResponse(400,{},"No video found"))
}else{
    
    return res.status(200).json(
         
        new apiResponse(200, videos, "Videos fetched successfully")
    );
}

})

const getVideoByid = asyncHandler(async(req,res)=>{
    const {videoId}=req.params;
    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new apiError(400,"Videoid is invalid")
    }

    const video =await Video.findById(videoId).populate("owner" ,"username avatar")

     if (!video) {
        return res.status(404).json(
            new apiResponse(404, {}, "Video not found")
        );
    }

    return res.status(200).json(
        new apiResponse(200, video, "Video fetched successfully")
    );
})

export {
    publishVideo,
    getAllVideos,
    getVideoByid
}