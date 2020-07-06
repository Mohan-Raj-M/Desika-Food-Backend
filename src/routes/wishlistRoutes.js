const express = require('express')
const Product = require('../models/Products')
const Wishlist = require('../models/wishlist')
const auth = require('../middleware/requireAuth')
const { findOneAndDelete } = require('../models/wishlist')
const router = new express.Router()

router.post('/wishlist/storewish/:id', auth, async (req, res) => {
    const productId = req.params.id

    try {
        const product = await Product.findById({ _id = productId })
        const wish = new Wishlist ({
            name : product.name,
            description : product.description,
            price : product.price,
            wisherEmail : req.user.email
        })

        await wish.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/wishlist/getwishlist', auth, async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ wisherEmail : req.user.email }).reverse()

        res.send(wishlist)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete('/wishlist/removewish/:id', auth, async (req, res) => {
    try {
        const { name } = await Product.findById({ _id = req.params.id })
        await Wishlist.findOneAndDelete({ wisherEmail : req.user.email, name })
        res.send()
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = router