const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
name: {
        type: String,
        required: true
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
}, { timestamps: true });
   
    

const classroom = mongoose.model("Classroom", classroomSchema)

module.exports = classroom;