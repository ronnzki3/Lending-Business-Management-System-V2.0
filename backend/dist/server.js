"use strict";

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var ClientRouter = require("./routes/client");
var LoanRouter = require("./routes/loan");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//from express session change to cookie session - due to server error deplyment
// const session = require('express-session');

var session = require('cookie-session');
require('dotenv').config();
var app = express();
var port = process.env.PORT || 5000;

//supress mongoose deprecation warning
mongoose.set('strictQuery', true);

//middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.CLIENT_URI],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  key: "userKey",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24
  }
}));

//mongodb connection
var uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log("MongoDB database connected successfully.");
});
app.get('/', function (req, res) {
  res.sendStatus(200);
});
app.use('/client', ClientRouter);
app.use('/loan', LoanRouter);

//run the server
app.listen(port, function () {
  console.log("Server is running in port: ".concat(port));
});