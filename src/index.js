const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth=require("./middleware/requireAuth")
require("./models/User");
require("./mongo")

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(authRoutes);


app.get("/",requireAuth, (req, res) => {
  res.send(`Your email:${req.user.email}`);
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
