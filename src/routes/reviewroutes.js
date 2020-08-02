const express = require('express')
const Review = require('../models/Reviews')
const auth = require('../middleware/requireAuth')
const router = new express.Router()

router.post('/review/givereview', auth, async (req, res) => {
    const review = new Review(req.body)
    try {
        if (!req.user.valid) {
            alert('Please validate your mail')
            location.href = '/'
        }
        await review.save()
        res.status(200).send('Review successfully sent!')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/review/seereviews', async (req, res) => {
    const reviews = await Review.find({})
    res.send(reviews)
})

router.get('/review/seelatestreviews', async (req, res) => {
    const reviews = await Review.find({}).reverse()
    res.send(reviews).limit(5)
})

module.exports = router