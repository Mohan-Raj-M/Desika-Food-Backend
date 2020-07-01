const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
        required : true,
        validate(value) {
            if (value < 0) {
                throw new Error('Price cannot be negative')
            }
        }
    }
})

const Product = mongoose.model('Task', productSchema)

module.exports = Product