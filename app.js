const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 

const groupsRoute = require("./routes/groups")    
const elementsRoute = require("./routes/elements")

var session = require('express-session');
const MongoDBStore = require('express-mongodb-session')(session);

const app = express();
require('dotenv').config()
 
let sessionMaxAge = 800000


 
mongoose.connect('mongodb+srv://rochard_database:qxMjOq0Akwm32zBP@cluster0.0v5yb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/groups", groupsRoute);
app.use("/api/elements", elementsRoute);

app.use("/",(req, res)=>{
    res.status(201).json({
        message : "Server online"
    })
})


module.exports = app;

//https://mapper-ky2i.onrender.com