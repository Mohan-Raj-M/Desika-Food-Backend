const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/verification/:email', async (req, res) => {
    const email = req.params.email

    try {
        const user = await User.findOne({email:email})
        user['valid'] = true
        res.send("tour email registered sucessfully!!!!")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = router