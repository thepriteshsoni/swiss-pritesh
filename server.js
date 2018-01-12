var express = require('express');
var app = express();
var morgan = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var handlebars = require('express-handlebars')
.create({
    extname: '.pks'
});

var hostname = 'localhost';
var port = 8000;

app.engine('.pks', handlebars.engine);
app.set('view engine', '.pks');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

var file = {
    path: "tmp/sessions",
    useAsync: true,
    reapInterval: 5000,
    maxAge: 3600000
};
app.use(session({
    store: new fileStore(file),
    secret: 'eatsleepcoderepeat',
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/public'));

require('./config/passport')(passport);
require('./app/router.js')(app, passport);

app.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});
