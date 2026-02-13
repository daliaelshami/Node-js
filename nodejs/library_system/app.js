require("dotenv").config()
const express = require("express")
const mongoose =  require("mongoose")

const app = express()

app.use(express.json())

async function DBconnection(){
    try{
        await mongoose.connect(process.env.DBURL) 
        console.log("db connected")
    }catch(error){
        console.log("db disconnected")
    }
}

DBconnection()

app.get("/",(req,res)=>{
    res.send("welcome to root")
})

const Author = require("./models/author")
const Book = require("./models/book")

app.post("/api/authors",async (req,res)=>{
    try{
        const author  = await Author.create(req.body)
        res.send(author)
        console.log("creating authors")
    }catch(error){
        console.log("error creating authors")
    }
})
app.get("/api/authors",async (req,res)=>{
    try{
        const author  = await Author.find()
        res.send(author)
        console.log("reading authors")
    }catch(error){
        console.log("error reading authors")
    }
})
app.post("/api/books",async (req,res)=>{
    try{
        const book  = await Book.create(req.body)
        res.send(book)
        console.log("creating book")
    }catch(error){
        console.log("error creating book")
    }
})
app.get("/api/books",async (req,res)=>{
    try{
        const book  = await Book.find().populate("author","name")
        res.send(book)
        console.log("reading books")
    }catch(error){
        console.log("error reading books")
    }
})
app.listen(process.env.PORT,()=>{
    console.log("server running ...")
})