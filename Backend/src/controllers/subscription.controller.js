import {apiError} from  "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
 import mongoose  from "mongoose"
import { Subscription } from "../models/subscription.model.js"

const toggleSubscription =asyncHandler(async(req,res)=>{
    const {channelId}=req.params

    if(!mongoose.Types.ObjectId.isValid(channelId)){
        throw new apiError(400,"Invalid channel id ")
    }

    const subscriber =await  Subscription.findOne({
        channel:channelId,
        subscriber:req.user._id
    })


    if(!subscriber){
        await Subscription.create({
            channel:channelId,
            subscriber:req.user._id
        })

        return res.status(200).json(new apiResponse(200,{isSubscribed :true},"Subscribed"))
    }else{
        await Subscription.deleteOne({ _id :subscriber._id})
    return res.status(200).json(new apiResponse(200,{isSubscribed :false},"Unsubscribed"))
    }





})


const checkSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
        throw new apiError(400, "Invalid channel id");
    }

    const subscriber = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id
    });

    return res.status(200).json(
        new apiResponse(
            200,
            { isSubscribed: !!subscriber },
            "Subscription status fetched"
        )
    );
});

export {
    toggleSubscription,
    checkSubscription
}
 