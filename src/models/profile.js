const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    email : {
        type : String,
        trim : true,
        required : true
    },
    name : {
        type : String,
        trim : true,
    },
    phone: {
        type: Number,
        required: true,
    },
    age : {
        type : Number
    },
    address : {
        type : String,
        trim : true
    }
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile