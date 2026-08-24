import { Video } from "../models/video.model.js";
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const publishVideo=asyncHandler(async (requestAnimationFrame,res)=>{
    const {title,description}=req.body
    if(!title){
        throw new apiError(404,"title is required")

    }
      if(!description){
        throw new apiError(404,"description is required")

    }

    const videoFileLocalpath=req.files.videoFile?.[0]?.path

    const thumbnailLocalPath=req.files.thumbnail?.[0]?.path
    
})