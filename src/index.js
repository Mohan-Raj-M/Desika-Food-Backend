const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const reviewRoute = require('./routes/reviewroutes');
const productRoute=require('./routes/productRoutes')
const orderRoute=require('./routes/orderRoutes')
const requireAuth=require("./middleware/requireAuth")
require("./models/User");
require("./mongo")

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(reviewRoute);
app.use(productRoute);
app.use(orderRoute);


app.get("/",requireAuth, (req, res) => {
  res.send(`Your email:${req.user.email}`);
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
