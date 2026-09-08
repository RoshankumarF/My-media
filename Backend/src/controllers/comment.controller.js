import {apiError} from  "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {Video} from "../models/video.model.js"
import mongoose  from "mongoose"
import { Comment } from "../models/comment.model.js"

const addComment =asyncHandler(async(req,res)=>{
    const {content} =req.body
    const {videoId}=req.params;

    if(!content?.trim()){
        throw new apiError(404,"Content of comment is miising ")
    }

    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new apiError(400,"Invalid videoid")
    }

    const video= await Video.findById(videoId)
    if(!video){
        throw new apiError(404,"Video Not found");
    }

    const comment = await Comment.create({
        content:content,
        video:videoId,
        owner:req.user._id
    })

    const populatedComment = await Comment.findById(comment._id)
    .populate("owner", "username avatar");

    return  res.status(201).json(new apiResponse(201,populatedComment,"Comment added successfully"))



})

const getVideoComments=asyncHandler(async(req,res)=>{
    const {videoId}=req.params
    const {page = 1, limit = 10} = req.query
    Number(page)
    Number(limit)

     if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new apiError(400,"Invalid videoid")
    }

    const video= await Video.findById(videoId)
    if(!video){
        throw new apiError(404,"Video Not found");
    }



    const comments=await Comment.find(
        {
            video :videoId
        }
    ).populate("owner" ,"username avatar").sort({createdAt:-1}).skip((page-1)*limit).limit(limit)

    if(!comments){
         throw new apiError(404,"comments Not found");
       
    }

    return res.status(200).json(new apiResponse(200,comments,"Comment fetched successfully"))


      

})

export {
    addComment,
    getVideoComments
}