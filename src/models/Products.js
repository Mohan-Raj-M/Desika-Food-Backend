const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id : {
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
    },
    img : {
        type : Buffer
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product