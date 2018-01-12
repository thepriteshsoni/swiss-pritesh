var st = require ('./src/swiss_tournament.js');
var argv = require('yargs')
    .usage("swiss_main --action=<action_name> [action params]")
    .demand("action")
    .argv

function printPlayerStandings(user, tournament){
    st.playerStandings(user, tournament, function(err, x) {
        if (err) {
            throw err;
        }
        else {
            x.forEach(function(elem) {
                console.log(elem);
            });
        }
    });
}
if (argv.action == 'registerUser') {
    if (argv.name && argv.pw) {
        st.registerUser(argv.name, argv.pw, function(err, res) {
            if (!err) {
                console.log("record inserted!" + res);
            }
            else {
                console.log("err occured", err);
            }
        });
    }
    else {
        console.log("--name and --pw are required when registering a player");
    }
}
if (argv.action == 'createTournament') {
    if (argv.user && argv.t) {
        st.createTournament(argv.user, argv.t, function(err, x) {
            if (!err) {
                console.log("tournament created: ", x);
            }
            else {
                console.log("err occured", err);
            }
        });
    }
    else {
        console.log("--user and --t are required while creating a tournament");
    }
}
if (argv.action == 'getTournaments') {
    if (argv.name) {
        st.getTournaments(argv.name, function(err, result) {
            if (err) {
                console.log("error occured!");
            }
            else {
                for(var res of result) {
                    console.log(res.name);
                }
            }
        });
    }
    else {
        console.log("--name is required when registering a player");
    }
}
if (argv.action == 'registerPlayer') {
    if (argv.user && argv.t && argv.player) {
        st.registerPlayer(argv.user, argv.t, argv.player, function(err, x) {
            if (!err) {
                if(x == -1) {
                    console.log("Player cannot be added mid-way into the tournament!");
                }
                else {
                    console.log("Player added:", x);
                }
            }
            else {
                console.log("err occured", err);
            }
        });
    }
    else {
        console.log("--user and --t are required when registering a player");
    }
}
else if (argv.action == 'count') {
    if (argv.user && argv.t) {
        st.playerCount(argv.user, argv.t, function(err, x) {
            if (err) {
                throw err;
            }
            else {
                console.log("Total number of players:", x);
            }
        });
    }
    else {
        console.log("--user and --t are required for displaying total number of players!");
    }
}
else if (argv.action == 'deletePlayers') {
    st.deletePlayers(function(err, x) {
        if (err) {
            throw err;
        }
        else {
            console.log("Deleted players:", x);
        }
    });
}
else if (argv.action == 'deleteMatches') {
    st.deleteMatches(function(err, x) {
        if (err) {
            throw err;
        }
        else {
            console.log("Deleted matches:", x);
        }
    });
}
else if (argv.action == "playerStandings") {
    if (argv.user && argv.t) {
        printPlayerStandings(argv.user, argv.t);
    }
    else {
        console.log("--user and --t are required for viewing player standings");
    }
}
else if (argv.action == "swissPairings") {
    if (argv.user && argv.t) {
        st.swissPairings(argv.user, argv.t, function(err, x) {
            if (err) {
                throw err;
            }
            else {
                x.forEach(function(elem) {
                    console.log(`(${elem[0].name}) vs (${elem[1].name})`);
                });
            }
        });
    }
    else {
        console.log("--user and --t are required for viewing fixtures");
    }
}
else if (argv.action == "reportGame") {
    if (argv.user && argv.t && argv.round && argv.winner && argv.loser) {
        st.reportGame(argv.user, argv.t, argv.round, argv.winner, argv.loser, function(err, x) {
            if (err) {
                throw err;
            }
            else if(x == 0)
                console.log("Try another fixture");
            else {
                console.log("Match reported succesfully: ", x);
            }
        });
    }
    else {
        console.log("user, tournament, winner, loser and round are required for reporting a match!");
    }

}
else if (argv.action == "executeRound") {
    if (argv.user && argv.t && argv.round) {
        st.swissPairings(argv.user, argv.t, function(err, sp) {
            sp.forEach(function(pairing, index){
                if (Math.random() > 0.5) {
                    st.reportGame(argv.user, argv.t, argv.round, pairing[0].name, pairing[1].name,
                    function(err, result){
                        if (err) {
                            throw err;
                        }
                        console.log(`${pairing[0].name} beats ${pairing[1].name}`);
                        if (index == sp.length - 1) {
                            printPlayerStandings(argv.user, argv.t);
                        }
                    });
                }
                else {
                    st.reportGame(argv.user, argv.t, argv.round, pairing[1].name, pairing[0].name,
                    function(err, result){
                        if (err) {
                            throw err;
                        }
                        console.log(`${pairing[1].name} beats ${pairing[0].name}`);
                        if (index == sp.length - 1) {
                            printPlayerStandings(argv.user, argv.t);
                        }
                    });
                }
            });
        });
    }
    else {
        console.log("For executing a round, tournament, winner and round are required");
    }
}
else {
    console.log("Unknown action")
}
