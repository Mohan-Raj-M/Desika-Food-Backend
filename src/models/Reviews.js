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
        validate(value) {
            if (value < 0) {
                throw new Error('Price cannot be negative')
            }
        }
    }
})

const Review = mongoose.model('Task', reviewSchema)

module.exports = Review