const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors =require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const session = require('express-session')

//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database' + config.database);

});

//on ERROR
mongoose.connection.on('error', (err) => {
    console.log('Database error' + err );

});



const app= express();
const users = require('./routes/users');
const productsrouter = require('./routes/products');
const port = 3000;

//express sessipm
app.use(session({ secret: 'yoursecret' }));
//CORS Middleware
app.use(cors());
//body parserer midleware
app.use(bodyParser.json());




//---
//app.use(express.methodOverride());

  //app.use(express.cookieParser()); // read cookies (needed for auth)
  //app.use(express.bodyParser()); // get information from html forms
//app.use(express.session({ secret: 'SECRET' })); // session secret
//--
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//body parserer midleware
//app.use(bodyParser.json());
app.use('/users',users);
app.use('/products',productsrouter);
//set static folder
app.use(express.static(path.join(__dirname,'public')))
//index Route-
app.get('/',(req, res) => {
    res.send('invalid endpoint');

});


app.listen(port,() => {

    console.log('server run on  poert' + port);

}


)

