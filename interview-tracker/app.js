require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/IT_Routes");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = process.env.MONGODB_URI || 
  "mongodb+srv://anuradhaharale:Aklhf%4029@cluster0.oyqttry.mongodb.net/Interview_Tracker?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// routes
app.use(routes);

// 404 catch-all
app.get('*', function(req, res) {
  res.redirect("/404");
});
