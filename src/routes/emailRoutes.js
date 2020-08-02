const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { sendWelcomeEmail, sendConfirmationmail } = require('../emails/accounts')
const auth = require('../middleware/requireAuth')

router.get('/verification/:token', async (req, res) => {
    try {
        jwt.verify(req.params.token, "Email_auth_key", async (e, token) => {
            if (e) {
                return res.status(400).send({error: 'Invalid token'})
            }

            const {email} = token
            const user = await User.findOne({email})
            user.valid = true
            sendWelcomeEmail(user.email, user.name)
            await user.save()
            res.send({success: 'Email verified!'})
        })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/unsubscribe/:token', async (req, res) => {
    try {
        jwt.verify(req.params.token, "Email_auth_key", async (e, token) => {
            if (e) {
                return res.status(400).send({error: 'Invalid token'})
            }

            const {email} = token
            await User.findOneAndDelete({email})
            res.send({message: 'Sorry for the misunderstanding'})
        })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/resendemail',auth , async (req, res) => {
    try {
        sendConfirmationmail(req.user.email, req.user.name)
        alert('Verification mail sent.')
        location.href = '/'
    } catch (e) {
        
    }
})

module.exports = router