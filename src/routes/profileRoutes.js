const express = require('express')
const Profile = require('../models/profile')
const auth = require('../middleware/requireAuth')
const router = new express.Router()

router.post('/profile/saveprofile', auth, async (req, res) => {
    const profile = await Profile(req.body)
    try {
        if (!req.user.valid) {
            alert('Please validate your mail')
            location.href = '/'
        }
        await profile.save()
        res.status(200).send('Profile saved successfully!!')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

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