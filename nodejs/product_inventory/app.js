require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express") 
const app = express()
app.use(express.json())
const port = process.env.PORT


async function DBconnection(){
    try{
        await mongoose.connect(process.env.DBURL)
        console.log("db connected");
    }catch(error){
        console.log("db disconnected")
    }
}
DBconnection()

app.get("/",(req,res)=>{
    try{
        res.send("welcome to product inventory")
        console.log("success reading product inventory")
    }catch(error){
        console.log("error reading product inventory")
    }
})

app.listen(port,()=>{
    console.log("server running ...")
})