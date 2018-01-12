var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var st = require('../src/swiss_admin.js');

adminRouter = express.Router();

adminRouter.route('/')
    .get(function(req, res, next){
        var temp = req.user.email;
        if(temp == 'admin@admin') {
            st.getUsers(temp, function(err, result) {
                if(err) {
                    throw err;
                }
                else {
                    st.getUnblockedUsers(temp, function(err, result2) {
                        if(err) {
                            throw err;
                        }
                        else {
                            st.getTopActiveUsers(temp, function(err, result3) {
                                if(err) {
                                    throw err;
                                }
                                else {
                                    res.render('admin.pks', {
                                        pool : result, block : result2, top : result3
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
        else {
            res.end('No administrative privileges found!');
        }
    });

adminRouter.route('/block')
    .post(function (req, res, next) {
        var temp = req.user.email;
        console.log('user to be blocked:', req.body.name);
        if(temp == 'admin@admin') {
            st.blockUser(req.body.name, function(err, result) {
                if(err) {
                    res.end(err);
                }
                else {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(req.body.name));
                }
            });
        }
        else {
            res.end('No administrative privileges found!');
        }
    });

exports.adminRouter = adminRouter;
