const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    email : {
        type : String,
        trim : true,
        required : true
    },
    name : {
        type : String,
        trim : true,
        default : this.email
    },
    message : {
        type : String,
        required : true,
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review