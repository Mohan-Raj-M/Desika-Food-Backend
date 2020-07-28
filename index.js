const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const reviewRoute = require('./src/routes/reviewroutes');
const productRoute=require('./src/routes/productRoutes')
const orderRoute=require('./src/routes/orderRoutes')
const requireAuth=require("./src/middleware/requireAuth")
require("./src/models/User");
require("./src/mongo")
var PORT=process.env.PORT||5000

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



app.listen(PORT, () => {
  console.log("App running on port 5000");
});
