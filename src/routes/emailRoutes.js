const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.get('/verification/:token', async (req, res) => {
    try {
        jwt.verify(req.params.token, "Email_auth_key", async (e, token) => {
            if (e) {
                return res.status(400).send({error: 'Invalid token'})
            }

            const {email} = token
            await User.findOneAndUpdate({email}, {valid: true})
            res.send({success: 'Email verified!'})
        })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = router