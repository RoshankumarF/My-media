import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"


const connectDb =async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected  successfully `)
    } catch (error) {
        console.log("Mongo db connection failed",error)
    }
}

export {connectDb}