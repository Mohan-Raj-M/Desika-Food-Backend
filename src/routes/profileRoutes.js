const express = require('express')
const Profile = require('../models/profile')
const auth = require('../middleware/requireAuth')
const router = new express.Router()

router.get('/profile/getprofile', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ email : req.user.email })
        res.send(profile)
    } catch (e) {
        res.status(400).send({ error : e.message })        
    }
})

router.patch('/profile/editprofile', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const profile = await Profile.findOne({ email : req.user.email })
        updates.forEach((update) => profile[update] = req.body[update])
        await profile.save()
        res.send()
    } catch (e) {
        res.status(400).send({ error : e.message })
    }
})

module.exports = router