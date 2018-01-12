var express = require('express');
var path = require('path');
var swissRouter = require('./routes.js').swissRouter;
var adminRouter = require('./admin.js').adminRouter;

module.exports = function(app, passport) {

    app.use('/admin', isLoggedIn, adminRouter);
    app.use('/tournament', isLoggedIn, swissRouter);
    app.get('/', function(req, res) {
        if(req.isAuthenticated()) {
            return res.redirect('/profile');
        }
        res.render('index.pks');
    });
    app.get('/login', function(req, res) {
        if(req.isAuthenticated()) {
            return res.redirect('/profile');
        }
        res.render('login.pks', { message: req.flash('loginMessage') });
    });
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', { failureFlash : true }, function(err, user, info) {
            if (err) {
                 res.status(500).send(JSON.stringify({
                    'msg': "Internal Server Error"
                }));
            }
            if (!user) {
                return res.render('login.pks', { message: req.flash('loginMessage') });
            }
            req.login(user, function(err) {
                if (err) return next(err);
                req.session.save(function(err) {
                    if (!err) {
                        return res.redirect('/profile');
                    }
                    else {
                        console.log('error occured during session save');
                    }
                });
            });
        })(req, res, next);
    });
    app.get('/signup', function(req, res) {
        if(req.isAuthenticated()) {
            return res.redirect('/profile');
        }
        res.render('signup.pks', { message: req.flash('signupMessage') });
    });
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', { failureFlash : true }, function(err, user, info) {
            if (err) {
                 res.status(500).send(JSON.stringify({
                    'msg': "Internal Server Error"
                }));
            }
            if (!user) {
               return res.render('signup.pks', { message: req.flash('signupMessage') });
            }
            req.login(user, function(err) {
                if (err) return next(err);
                req.session.save(function(err) {
                    if (!err) {
                        return res.redirect('/profile');
                    }
                    else {
                        console.log('error occured during session save');
                    }
                });
            });
        })(req, res, next);
    });
    app.get('/profile', isLoggedIn, function(req, res) {
        if(req.user.email == 'admin@admin') {
            res.redirect('/admin');
        }
        else {
            res.render('profile.pks', {
                user : req.user
            });
        }
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', function(req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if (err) {
                 res.status(500).send(JSON.stringify({
                    'msg': "Internal Server Error"
                }));
            }
            if (!user) {
                return res.redirect('/');
            }
            req.login(user, function(err) {
                if (err) return next(err);
                req.session.save(function(err) {
                    if (!err) {
                        res.redirect('/profile');
                    }
                    else {
                        console.log('error occured during session save');
                    }
                });
            });
        })(req, res, next);
    });
    app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));
    app.get('/auth/google/callback', function(req, res, next) {
        passport.authenticate('google', function(err, user, info) {
            if (err) {
                 res.status(500).send(JSON.stringify({
                    'msg': "Internal Server Error"
                }));
            }
            if (!user) {
                return res.redirect('/');
            }
            req.login(user, function(err) {
                if (err) return next(err);
                req.session.save(function(err) {
                    if (!err) {
                        res.redirect('/profile');
                    }
                    else {
                        console.log('error occured during session save');
                    }
                });
            });
        })(req, res, next);
    });
    app.get('/logout', function(req, res) {
        req.logout();
        req.session.destroy();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
