const mongoose = require("mongoose")
const express = require("express")
const app =express()

const dataBase = "mongodb+srv://Recky776:Hamza8063@cluster0.ay7ptf3.mongodb.net/"
mongoose.connect(dataBase).then(()=>
{
    console.log("database connected")
    app.listen(5000,()=>{
        console.log("port is working on Port # 5000")
    })
    
}).catch((error)=>{
    console.log("Database not conected")
    console.log(error)
})







