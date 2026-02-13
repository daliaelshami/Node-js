require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

async function DBconnection(){
    try{
        mongoose.connect(process.env.DBURL);
        console.log("db connected")
    }catch(error){
        console.log("db disconnected")
    }
}

DBconnection()

app.get("/",(req,res)=>{
    res.send("welcome to root")
})
const Contacts = require("./models/contact")
app.post("/api/contacts",async(req,res)=>{
    try{
        const contact = await Contacts.create(req.body)
        res.send(contact)
    }catch(error){
        console.log("error creating contact")
    }
})
app.get("/api/contacts",async(req,res)=>{
    try{
        const contact = await Contacts.find()
        res.send(contact)
    }catch(error){
        console.log("error reading contact")
    }
})
app.listen(process.env.PORT,()=>{
    console.log("server running")
    console.log("http://localhost:3000/")
})