require("dotenv").config();
const express= require("express");
const app = express();

const mongoose= require("mongoose");
app.use(express.json());

const port= process.env.PORT ||3000;

async function dbconnection() {
    try {
     await mongoose.connect(process.env.URL)
        console.log(process.env.URL);
        console.log('Connected!');
    } catch (error) {
        console.log(error);
        
    }
    
}
dbconnection();

 const Student = require("./models/student");
 const Classroom = require("./models/classroom");

 app.post("/api/students", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json(
                { msg: "Name is required" });
        }

        const student = await Student.create({ name });

        res.status(201).json({
            msg: "Student created",
            data: student
        });

    } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error: error.message });
}

});

app.post("/api/classrooms", async (req, res) => {
    try {
        const { name, students } = req.body;

        if (!name) {
            return res.status(400).json({ 
                msg: "Name is required" 
            });
        }

        const classroom = await Classroom.create({
            name,
            students   
        });

        res.status(201).json({
            msg: "Classroom created",
            data: classroom
        });

    } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error: error.message });
}

});

app.get("/api/classrooms", async (req, res) => {
    try {

        const classrooms = await Classroom.find()
            .populate("students");   

        res.json({
            count: classrooms.length,
            data: classrooms
        });

    } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error: error.message });
}

});

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
    
});  