import express from 'express'

const app=express();


app.use((req,res)=>{
    res.send("Connection working well")
})

export default app