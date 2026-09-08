import express from 'express'
import cookieParser from "cookie-parser";
import cors from "cors"

const app=express();


// In  your Express backend:
 

app.use(cors({
    origin: process.env.CORS_ORIGIN, // e.g., "https://yoursite.com"
    credentials: true // MANDATORY if you are using cookies for JWTs!
}));


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())





 //app.get("/api/v1/test",(req,res,next)=>{
  //  res.status(200).json({ 
      //  success: true, 
       // message: "Success! Express is talking to React." 
    //});
 //})


// import router

import userRouter from "./routes/user.route.js"
import videoRouter from "./routes/video.route.js"
import commentRouter from  "./routes/comment.route.js"
import subscriptionRouter from "./routes/subscription.route.js"

//route declaration 
 
app.use("/api/v1/user",userRouter)
app.use("/api/v1/video",videoRouter)
app.use("/api/v1/comment",commentRouter)
app.use("/api/v1/subscription",subscriptionRouter)

export default app