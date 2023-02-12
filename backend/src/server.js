const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const ClientRouter = require('./routes/client');
const LoanRouter = require('./routes/loan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


// const session = require('express-session');

//In case express-session failed.
//from express session change to cookie session - due to server error deplyment
const session = require('cookie-session');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;


//supress mongoose deprecation warning
mongoose.set('strictQuery', true);

const client_uri=process.env.CLIENT_URI;
const keySecret=process.env.SESSION_SECRET;

//middleware
app.use(express.json());
app.use(cors({
        origin: [client_uri],
        methods: ["GET", "POST"],
        credentials: true,
}));
app.enable('trust proxy',true);
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    proxy: true,
    key:"userKey",
    secret: keySecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires : 60 * 60 * 24
    }
}));


//mongodb connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log(`MongoDB database connected successfully.`);
});


app.get('/',(req, res)=>{
    res.sendStatus(200)
})

app.use('/client', ClientRouter )
app.use('/loan', LoanRouter )



//run the server
app.listen(port, ()=>{
    console.log(`Server is running in port: ${port}`);
});