const mongoose  = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let mongouri =
  process.env.NODE_ENV === "production"
    ? process.env.mongouri
    :'mongodb+srv://mohan:kougW0DWyp7Icpi5@cluster0-frvyr.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {console.log("connected to database")})
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log('error =>',err);
});
