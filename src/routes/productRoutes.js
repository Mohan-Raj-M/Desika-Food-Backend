const express = require('express')
const Product = require('../models/Products')
const auth = require('../middleware/requireAuth')
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

module.exports = router;