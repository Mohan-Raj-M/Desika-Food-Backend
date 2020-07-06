const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    description : {
        type : String,
        trim : true,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    wisherEmail : {
        type : String,
        required : true
    }
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist