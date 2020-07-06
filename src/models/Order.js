const mongoose = require('mongoose')
const validator = require('validator')

const orderSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        validate (value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    quantity : {
        type : Number,
        default : 1
    },
    paymentMethod : {
        type : String,
        required : true,
        trim : true
    },
    prize : {
        type : Number,
        default : 0
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order