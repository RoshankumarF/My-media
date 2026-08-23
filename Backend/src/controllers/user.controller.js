import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const generateAccessAndRefreshToken=async(userId)=>{

    try {
        const user= await User.findById(userId)

        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken

        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
        
    } catch (error) {
        console.log(error)
        throw new apiError(500,"something went wrong while generating refresh and access Tokens ")
        
    }
}


const registerUser=asyncHandler(async (req ,res)=>{
    const {fullName,email,username,password}=req.body

    if([fullName,email,username,password].some((field)=>field?.trim()==="")){
        throw new apiError(400,"All fields are required")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new apiError(409,"user with email or username already exist")
    }

    const avatarlocalPath=req.files?.avatar?.[0]?.path;

    let coverImagelocalPath;

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImagelocalPath=req.files.coverImage[0].path;
    }

    if(!avatarlocalPath){
        throw new apiError(400,"Avatar file is required")
    }


    const avatar=await uploadOnCloudinary(avatarlocalPath)
    if(!avatar){
        throw new apiError(400,"Something went wrong while uploading on cloudinary")
    }
    const coverImage=await uploadOnCloudinary(coverImagelocalPath)

    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()

    })

    const userCreated=await User.findById(user._id).select("-password -refreshToken")

    if(!userCreated){
        throw new apiError(500,"Something went wrong while registering")
    }

    return res.status(201).json(new apiResponse(200,userCreated,"User registered successfully"))

})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,username,password}=req.body

    if(!(username||email)){
        throw new apiError(400,"username or email is required")
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new apiError(400,"user does not exist")
    }

    const isPasswordValid=await user.isPasswordCorrect(password)

     if(!isPasswordValid){
        throw new apiError(401,"Password is incorect ,try again ")
     }

     const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

      const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

      const options={
        httpOnly:true,
        secure:true
      }

      return res
      .status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken)
      .json(new apiResponse(200,{
        user:loggedInUser,
        accessToken,refreshToken
      },
      "user logged in successfully"
    ))

})

const logoutUser= asyncHandler(async (req,res)=>{
     
   await  User.findByIdAndUpdate(
         req.user._id,
         {
            $unset:{
                refreshToken:1
            }
         },
         {
            new :true
         }
    )
    const options={
        httpOnly :true,
        secure:true

      }

      return res
      .status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(new apiResponse(200,{},"user logged out successfully"))
    
})

export {
    registerUser,
    loginUser,
    logoutUser
}