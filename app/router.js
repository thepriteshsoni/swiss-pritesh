var express = require('express');
var path = require('path');
var swissRouter = require('./routes.js').swissRouter;
var adminRouter = require('./admin.js').adminRouter;

module.exports = function(app, passport) {

    app.use(express.static(__dirname + '/../public'));

    app.use('/admin', isLoggedIn, adminRouter);

    app.use('/tournament',isLoggedIn, swissRouter);

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(req.user.local.username);
        if(req.user.local.username == 'admin') {
            res.redirect('/admin');
        }
        else {
            res.render('profile.ejs', {
                user : req.user
            });
        }
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
