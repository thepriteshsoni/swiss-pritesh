var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mysql = require('mysql');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
var bcrypt   = require('bcrypt-nodejs');
var configAuth = require('./auth');
var st = require('../src/swiss_tournament.js');
var bodyParser = require('body-parser');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });
    passport.deserializeUser(function(email, done) {
        connection.query('select * from users where email = ?', [email], function(err, res) {
            if(err){
                return done(null,err);
            }
            done(null, res[0]);
        });
    });
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            connection.query('select * from users where email = ?', [email], function(err,res){
                if (err) {
                    return done(err);
                }
                if (res.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }
                else {
                    var newUser = new Object();
                    var email = req.body.email;
                    newUser.email = email;
                    newUser.password = password;
                    var status = 'ACTIVE';
                    newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                    var query = 'insert into users values (?, ?, ?, null, null)';
                    connection.query(query, [newUser.email, newUser.password, status], function(err,res){
                        req.body.user = newUser.email;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        connection.query('select * from users where email = ?', [email], function(err,res){
            if (err) {
                return done(err);
            }
            if (!res.length) {
                return done(null, false, req.flash('loginMessage', 'No user found with that email!'));
            }
            if(res[0].password == 'THIRDPARTY') {
                return done(null, false, req.flash('loginMessage', 'Kindly log-in with the registered social media handle!'));
            }
            if (!(bcrypt.compareSync(password, res[0].password))) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            req.body.user = res[0].email;
            return done(null, res[0]);
        });
    }));
    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            connection.query('select * from users where email = ?', [profile._json.email], function(err, res){
                if (err) {
                    return done(err);
                }
                else{
                    var newUser = new Object();
                    newUser.email = profile._json.email;
                    newUser.password = 'THIRDPARTY';
                    newUser.id = profile._json.id;
                    newUser.token = token;
                    var status = 'ACTIVE';
                    var query= 'insert into users values (?, ?, ?, ?, ?)';
                    connection.query(query, [newUser.email, newUser.password, status, newUser.id, token] , function(err, res){
                        if(err) {
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleOAuth.clientID,
        clientSecret    : configAuth.googleOAuth.clientSecret,
        callbackURL     : configAuth.googleOAuth.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            connection.query('select * from users where email = ?', [profile._json.emails[0].value], function(err, res){
                if (err) {
                    return done(err);
                }
                else{
                    var newUser = new Object();
                    newUser.email = profile._json.emails[0].value;
                    newUser.password = 'THIRDPARTY';
                    newUser.id = profile._json.id;
                    newUser.token = token;
                    var status = 'ACTIVE';
                    var query= 'insert into users values (?, ?, ?, ?, ?)';
                    connection.query(query, [newUser.email, newUser.password, status, newUser.id, token] , function(err, res){
                        if(err) {
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};





