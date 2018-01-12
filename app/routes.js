var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var st = require('../src/swiss_tournament.js');

swissRouter = express.Router();
swissRouter.use(bodyParser.urlencoded({
    extended: true
}));
swissRouter.use(bodyParser.json());

swissRouter.route('/')
    .get(function(req, res, next){
        res.render('tournament.pks', {tour : []});
    });

swissRouter.route('/gettours')
    .get(function(req, res, next){
        var temp = req.user.email;
        st.getTournaments(temp, function(err, result) {
            if(err) {
                throw err;
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify( result ));
            }
        });
    });

swissRouter.route('/new')
    .post(function(req, res, next){
        var temp = req.user.email;
        console.log(temp, req.body.name);
        st.createTournament(temp, req.body.name, function(err, result) {
            if (result == 0) {
                res.end('error');
            }
            else {
                console.log("tournament created: ");
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(req.body.name));
            }
        });
    });

swissRouter.route('/game/:id')
    .get(function (req, res, next) {
        var temp = req.user.email;
        console.log(temp, req.params.id);
        st.checkStatus(temp, function(err, result0) {
            if(err) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({id: 0, msg: 'Technical error'}));
            }
            else {
                console.log('Status: ', result0);
                if(result0[0].status == 'SUSPENDED') {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({id: 0, msg: 'You are blocked! Contact system admin!!'}));
                }
                else {
                    st.playerCount(temp, req.params.id, function(err, result2) {
                        if(err) {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({id: 0, msg: 'Technical error'}));
                        }
                        else {
                            if(result2 == 0) {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({id: -1, msg: 'No players in the tournament!'}));
                            }
                            else if(result2 == 1) {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({id: -1, msg: '2^n number of players required!'}));
                            }
                            else if(Math.log2(result2) % 1 == 0) {
                                st.nextRound(temp, req.params.id, function(err, result) {
                                    if(err) {
                                        res.setHeader('Content-Type', 'application/json');
                                        res.end(JSON.stringify({id: 0, msg: 'Feature unavailable currently!'}));
                                    }
                                    else {
                                        if(result-1 == Math.log2(result2)) {
                                            res.setHeader('Content-Type', 'application/json');
                                            res.end(JSON.stringify({id: 2, msg: 'The END! Player with Rank 1 won! Go give him a cookie!!!'}));
                                        }
                                        else {
                                            st.swissPairings(temp, req.params.id, function(err, results) {
                                                if (err) {
                                                    res.setHeader('Content-Type', 'application/json');
                                                    res.end(JSON.stringify({id: 0, msg: 'Feature unavailable currently!'}));
                                                }
                                                else {
                                                    st.gamesHistory(temp, req.params.id, function(err, result3) {
                                                        if(err) {
                                                            res.setHeader('Content-Type', 'application/json');
                                                            res.end(JSON.stringify({id: 0, msg: 'Feature unavailable currently!'}));
                                                        }
                                                        else {
                                                            console.log(result3);
                                                            res.setHeader('Content-Type', 'application/json');
                                                            res.end(JSON.stringify({id: 1, pair : results, tour : req.params.id, nxt : result, game : result3}));
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({id: -1, msg: '2^n number of players required!'}));
                            }
                        }
                    });
                }
            }
        });
    });

swissRouter.route('/game/view/:id')
    .get(function(req, res, next) {
        var temp = req.user.email;
        console.log(temp, req.params.id);
        st.checkStatus(temp, function(err, result0) {
            if(err) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({id: 0, msg: 'Technical error'}));
            }
            else {
                console.log('Status: ', result0);
                if(result0[0].status == 'SUSPENDED') {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({id: 0, msg: 'You are blocked! Contact system admin!!'}));
                }
                else {
                    st.playerCount(temp, req.params.id, function(err, result2) {
                        if(err) {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({id: 0, msg: 'Technical error'}));
                        }
                        else {
                            if(result2 == 0) {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({id: -1, msg: 'No players in the tournament!'}));
                            }
                            else if(result2 == 1) {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({id: -1, msg: '2^n number of players required!'}));
                            }
                            else if(Math.log2(result2) % 1 == 0) {
                                st.nextRound(temp, req.params.id, function(err, result) {
                                    if(err) {
                                        res.setHeader('Content-Type', 'application/json');
                                        res.end(JSON.stringify({id: 0, msg: 'Feature unavailable currently!'}));
                                    }
                                    else {
                                        if(result-1 == Math.log2(result2)) {
                                            res.setHeader('Content-Type', 'application/json');
                                            res.end(JSON.stringify({id: -1, msg: 'The END! Player with Rank 1 won! Go give him a cookie!!!'}));
                                        }
                                        else {
                                            st.swissPairings(temp, req.params.id, function(err, results) {
                                                if (err) {
                                                    res.setHeader('Content-Type', 'application/json');
                                                    res.end(JSON.stringify({id: 0, msg: 'Feature unavailable currently!'}));
                                                }
                                                else {
                                                    st.gamesHistory(temp, req.params.id, function(err, result3) {
                                                        if(err) {
                                                            res.setHeader('Content-Type', 'application/json');
                                                            res.end(JSON.stringify({id: 0, msg: 'Feature unavailable currently!'}));
                                                        }
                                                        else {
                                                            res.render('game.pks', {
                                                                pair : results, tour : req.params.id, nxt : result, game : result3
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({id: -1, msg: '2^n number of players required!'}));
                            }
                        }
                    });
                }
            }
        });
    });

swissRouter.route('/game/view/report/:id')
    .post(function(req, res, next) {
        var temp = req.user.email;
        console.log(temp, req.params.id, req.body.name);
        for(var i = 0; i < req.body.name.length; ++i) {
            var pair = req.body.name[i].split('.');
            var round = pair[0];
            var winner = pair[1];
            var loser = pair[2];
            console.log(req.body.name);
            console.log('This is', round, winner, loser);
            st.reportGame(temp, req.params.id, round, winner, loser, function(err, result) {
                if(err) {
                    res.end(JSON.stringify({id: 0, msg: 'Error!'}));
                }
                else {
                    console.log(i);
                    res.end(JSON.stringify({id: 1, msg: 'Matches reported successfully!'}));
                }
            });
        }
    });

swissRouter.route('/:id')
    .get(function(req, res, next) {
        var temp = req.user.email;
        st.playerCount(temp, req.params.id, function(err, result2) {
            if(err) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({id: 0, msg: 'Technical error'}));
            }
            else {
                st.nextRound(temp, req.params.id, function(err, result4) {
                    if(err) {
                        throw err;
                    }
                    else {
                        if(result4-1 == Math.log2(result2)) {
                            st.getWinner(temp, req.params.id, function(err, wresult) {
                                if(err) {
                                    console.log(err);
                                }
                                else {
                                    res.render('browse.pks', {
                                        player: [], tour: req.params.id, rank: [], ep: [], finalwinner: wresult
                                    });
                                }
                            });
                        }
                        else {
                            res.render('browse.pks', {
                                player: [], tour: req.params.id, rank: [], ep: []
                            });
                        }
                    }
                });
            }
        });
    });

swissRouter.route('/browse/:id')
    .get(function(req, res, next){
        var temp = req.user.email;
        console.log(temp, req.params.id);
        st.getPlayers(temp, req.params.id, function(err, result) {
            if (err) {
                res.end('error');
            }
            else {
                st.playerStandings(temp, req.params.id, function(err, results) {
                    if (err) {
                        throw err;
                    }
                    else {
                        st.getExistingPlayers(temp, req.params.id, function(err, result5) {
                            if(err) {
                                throw err;
                            }
                            else {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({players: result, tour: req.params.id,
                                        ranks: results, ep: result5}));
                            }
                        });
                    }
                });
            }
        });
    });

swissRouter.route('/player/:id')
    .post(function(req, res, next) {
        var temp = req.user.email;
        console.log(temp, req.body.name, req.params.id);
        st.registerPlayer(temp, req.params.id, req.body.name, function(err, result) {
            if(err) {
                res.end(JSON.stringify({id: -1, msg: 'Player already added!'}));
            }
            else if(!err) {
                if(result == 0) {
                    res.end(JSON.stringify({id: 0, msg: 'Tournament already started!'}));
                }
                else {
                    console.log("player added!");
                    res.end(JSON.stringify({id: 1, msg: 'Player added successfully!', name: req.body.name}));
                }
            }
        });
    });

swissRouter.route('/eplayer/:id')
    .post(function(req, res, next) {
        var temp = req.user.email;
        console.log(temp, req.body.name, req.params.id);
        st.registerPlayer(temp, req.params.id, req.body.name, function(err, result) {
            if(err) {
                res.end(JSON.stringify({id: -1, msg: 'Player already added!'}));
            }
            else if(!err) {
                if(result == 0) {
                    res.end(JSON.stringify({id: 0, msg: 'Tournament already started!'}));
                }
                else {
                    st.getExistingPlayers(temp, req.params.id, function(err, result5) {
                        if(err) {
                            throw err;
                        }
                        else {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({id: 1, msg: 'Player added successfully!',
                            name: req.body.name, ep: result5}));
                        }
                    });
                }
            }
        });
    });

exports.swissRouter = swissRouter;
