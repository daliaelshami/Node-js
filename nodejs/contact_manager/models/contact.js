const mongoose = require("mongoose")

const contactsSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    phones:Array,
    socialMedia:{
        facebook:String,
        linkedin:String
    }
})

const Contacts = mongoose.model("Contacts",contactsSchema)
module.exports = Contacts