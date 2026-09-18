import mongoose, { mongo } from "mongoose";
import { Like } from "../models/Like.model.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const videoLikeToggle =asyncHandler(async(req,res)=>{

 
   
const {videoId}=req.params
 
 


if(!mongoose.Types.ObjectId.isValid(videoId)){
    throw new apiError(400,"invalid video id ")
}

 
const like =await Like.findOne({
    video:videoId,
    likedBy:req.user._id
})

if(like){
    await Like.findByIdAndDelete(like._id)
     return res.status(200).json(new apiResponse(201,{isLiked:false},"UnLiked successfully"));

}else{
   
    const likeCreated=await Like.create({
        video:videoId,
        likedBy:req.user._id

    })

    return res.status(201).json(new apiResponse(201,{isLiked:true},"Liked successfully"))
}

 

})

const getLikeCountVideo =asyncHandler(async(req,res)=>{
   
    const {videoId}=req.params
    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new apiError(400,"Invalid videoID")
    }

    const Countlike=await Like.countDocuments({
        video:videoId
    })

    return res.status(200).json(new apiResponse(200,{likeCount:Countlike},"like count fetched succesfully"))




})

const checkLiked =asyncHandler(async(req,res)=>{
    const {videoId}=req.params

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new apiError(400,"Invalid videoId")
    }

    const liked = await Like.findOne({
        video:videoId,
        likedBy:req.user._id
    })

    if(liked){
        return res.status(200).json(new apiResponse(200,{isLiked:true},"user has liked it "))
    }else{
        return res.status(200).json(new apiResponse(200,{isLiked:false},"user didnot liked it "))
    }
})

export {
    videoLikeToggle,
     getLikeCountVideo,
     checkLiked
}