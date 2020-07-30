const express = require("express")
const router = express.Router()
const User = require('../models/User')

router.get('/verification/:email', async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email})
        user['valid'] = true
        res.send({email:req.params.email})
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = router