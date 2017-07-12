var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

require('./config/passport')(passport);

var hostname = 'localhost';
var port = 8000;
var app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: 'eatsleepcoderepeat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/router.js')(app, passport);

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
