const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" })
  }

  const token = authorization.replace("Bearer ", "")
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must logged in" })
    }
    const { userId } = payload
    const user = await User.findById(userId)
    
    if (user.email.localeCompare('admin@example.com') !== 0) {
        throw new Error('Not Authorized!!')
    }

    next()
  })
}
