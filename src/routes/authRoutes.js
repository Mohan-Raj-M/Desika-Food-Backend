const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post('/registerUser',async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send({ token });
    } catch(error) {
        console.log('registerUser error',error);
        return res.status(400).send({ error });
    }
});
router.post('/login',async (req,res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        console.log(user);
        const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.status(200).send({ success:true });
    } catch(error) {
        return res.status(400).send({success:false, error:"Cannot login" });
    }
})

module.exports = router;
