const express = require('express')
const Product = require('../models/Products')
const Order = require('../models/Order')
const auth = require('../middleware/adminAuth')
const userAuth = require('../middleware/requireAuth')
const sharp = require('sharp')
const { findOne } = require('../models/Products')
const router = new express.Router()

router.post('/product/uploadproducts', auth, async (req, res) => {
    const product = new Product(req.body)
    try {
        await product.save()
        res.status(200).send('product successfully sent!')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

const upload = multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a photo!'))
        }

        cb(undefined, true)
    }
})

router.post('/products/img/:id', auth, upload.single('img'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).png().toBuffer()
    const product = await findOne({ _id : req.params.id })
    product.img = buffer
    await product.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error : error.message })
})

router.get('/product/orderedproducts', userAuth, async (req, res) => {
    try {
        const orders = await Order.find({ email : req.user.email })

        if(orders === undefined) {
            throw new Error('Orderlist empty')
        }

        const products = []
        for (let i = 0; i < orders.length; i++) {
            const product = await Product.findOne({ _id : orders[i].productId})
            products.push(product)
        }

        res.send(products)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router;