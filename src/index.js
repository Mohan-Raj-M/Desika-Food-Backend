const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth=require("./middleware/requireAuth")
require("./models/User");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  "mongodb+srv://mohan:kougW0DWyp7Icpi5@cluster0-frvyr.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo yeah");
});

app.get("/",requireAuth, (req, res) => {
  res.send(`Your email:${req.user.email}`);
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
