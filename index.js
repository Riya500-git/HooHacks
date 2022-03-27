const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./auth");
const contactRoute = require("./contact");
const userRoute = require("./users");
const dailyReportRoute = require("./dailyreports");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require('cookie-parser');

dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded(
    { extended:true }
))


app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api/users", userRoute);
app.use("/api/reports", dailyReportRoute);
app.use("/api/reports?", dailyReportRoute);

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...")
});
