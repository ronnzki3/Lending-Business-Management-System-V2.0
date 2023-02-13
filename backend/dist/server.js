"use strict";

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var ClientRouter = require("./routes/client");
var LoanRouter = require("./routes/loan");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//In case express-session failed.
//from express session change to cookie session - due to server error deplyment
// const session = require('cookie-session');

require('dotenv').config();
var app = express();
var port = process.env.PORT || 5000;

//supress mongoose deprecation warning
mongoose.set('strictQuery', true);
var client_uri = process.env.CLIENT_URI;
var keySecret = process.env.SESSION_SECRET;

//middleware
app.use(express.json());
app.use(cors({
  origin: [client_uri],
  methods: ["GET", "POST"],
  credentials: true
}));
app.enable('trust proxy');
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  proxy: true,
  key: "userKey",
  secret: keySecret,
  resave: false,
  saveUninitialized: false,
  name: 'userKeyMaster06521',
  // This needs to be unique per-host.

  //*********************** */
  // //production
  cookie: {
    httpOnly: true,
    secure: true,
    expires: 1000 * 60 * 60 * 24,
    sameSite: 'none'
  }

  // //*********************** */
  // //local
  // cookie: {       
  //     expires:1000 * 60 * 60 * 24,
  // }
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