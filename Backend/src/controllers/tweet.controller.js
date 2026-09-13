import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Tweet } from "../models/tweet.model.js"


const addTweet =asyncHandler(async(req,res)=>{
  const {content} =req.body
  if(!content?.trim()){
    throw new apiError("400","Content is required")
  }

  const tweet = await Tweet.create({
    content:content,
    owner:req.user._id
  })

  return res.status(201).json(new apiResponse(201,tweet,"Tweeted successfully "))
})

const getAllTweet =asyncHandler(async(req,res)=>{
       const tweets = await Tweet.find()
        .populate("owner", "username avatar")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new apiResponse(
            200,
            tweets,
            "Tweets fetched successfully"
        )
    );

})


export {
  addTweet,
  getAllTweet
}