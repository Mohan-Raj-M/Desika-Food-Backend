const express = require("express")
const router = express.Router()
const User = require('../models/User')

router.get('/verification/:email', async (req, res) => {
    const user = await User.findOne({email: req.params.email})
    user['valid'] = true
    res.send({email:req.params.email})
})

module.exports = router