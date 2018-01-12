var mysql = require('mysql');
var Game = require('./swiss_library.js').Game;
var Tournament = require('./swiss_library.js').Tournament;

function getConnection() {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "activeAI@123",
        database: "swiss"
    });
    connection.connect(function (err) {
        if(err)
            throw err;
    });
    return connection;
}

function getTournaments(user, cb) {
    var connection = getConnection();
    var sql = 'select name from tournaments where user = ?';
    connection.query(sql, [user], function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        cb(null, result);
    });
}

function registerUser(username, cb) {
    var connection = getConnection();
    var sql = 'insert into users(email) values (?)';
    connection.query(sql, [username], function (err, result) {
        connection.end();
        if (err) {
            cb(err, 0);
        }
        cb(null, 1);
    });
}

function checkStatus(user, cb) {
    var connection = getConnection();
    var sql = 'select status from users where email = ?';
    connection.query(sql, user, function (err, result) {
        connection.end();
        if (err) {
            cb(err, 0);
        }
        cb(null, result);
    });
}

function getPlayers(user, tournament, cb) {
    var connection = getConnection();
    var sql = 'select name from players where user = ? and tournament = ?';
    connection.query(sql, [user, tournament], function (err, result) {
        connection.end();
        if (err) {
            cb(err, result);
        }
        cb(null, result);
    });
}

function createTournament(user, tournament, cb) {
    var connection = getConnection();
    var sql = 'insert into tournaments values (?, ?)';
    connection.query(sql, [user, tournament], function (err, result) {
        connection.end();
        if (err) {
            cb(err, 0);
        }
        else {
            cb(null, 1);
        }
    });
}

function checkTournamentStatus(user, tourney, cb) {
    var connection = getConnection();
    var sql = 'select count(*) as nom from games where user = ? and tournament = ?';
    connection.query(sql, [user, tourney], function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        cb(null, result);
    });
}

function registerPlayer(user, tournament, player, cb) {
    checkTournamentStatus(user, tournament, function (err, result) {
        if(err) {
            throw err;
        }
        else {
            if(result[0].nom >= 1) {
                cb(null, 0);
            }
            else {
                insertPlayer(user, tournament, player, cb);
            }
        }
    });
}

function insertPlayer(user, tournament, player, cb) {
    var connection = getConnection();
    var sql = 'insert into players values (?, ?, ?)';
    connection.query(sql, [user, tournament, player], function (err, result) {
        connection.end();
        if (err) {
            cb(err, -1);
        }
        else {
            cb(null, player);
        }
    });
}

// uncertain function
function deletePlayers(cb) {
    var connection = getConnection();
    var sql = 'truncate table players';
    connection.query(sql, function (err, result) {
        connection.end();
        if (err) {
            cb(err, 0);
        }
        cb(null, result.affectedRows);
    });
}

function playerCount(user, tournament, cb){
    var connection = getConnection();
    var sql = 'select count(*) as total_players from players where user = ? and tournament = ?';
    connection.query(sql, [user, tournament], function (err, result) {
        connection.end();
        if (err) {
            cb(err, 0);
        }
        cb(null, result[0].total_players);
    });
}

function buildTournament(user, tournament, cb) {
    var connection = getConnection();
    var sql = 'select * from games where user = ? and tournament = ?';
    connection.query(sql, [user, tournament], function (err, result) {
        connection.end();
        if (err) {
            cb(err, 0);
        }
        var t = new Tournament();
        for (var res of result) {
            var g = new Game(res.round, res.winner, res.loser);
            t.addGame(g);
        }
        cb(null, t);
    });
}

function reportGame(user, tourney, round, winner, loser, cb) {
    buildTournament(user, tourney, function(err, tournament){
        if (tournament.hasPlayedInRound(round, winner, loser)) {
            cb(null, 0);
        }
        else {
            var connection = getConnection();
            var query = 'insert into games values (?, ?, ?, ?, ?)';
            connection.query(query, [user, tourney, round, winner, loser], function (err, result) {
                connection.end();
                if (err) {
                    cb(err, 0);
                }
                cb(null, 1);
            });
        }
    });
}

// uncertain function
function deleteMatches(cb) {
    var connection = getConnection();
    connection.query('delete from games', function (error, results, fields) {
        connection.end();
        if (error) {
            cb(error, 0);
        }
        cb(null, results.affectedRows);
    });
}

function playerStandings(user, tournament, cb) {
    var connection = getConnection();
    var query = `
        select p.name, (ifnull(ws.wins,0) + ifnull(ls.losses,0)) as games_played,
        ifnull(ws.wins, 0) as wins
        from
            players p
            left outer join
            ((select winner, count(*) as wins from games where user = ?
                and tournament = ?
                group by winner) as ws)
                    on (p.name = ws.winner)
            left outer join
            ((select loser, count(*) as losses from games where user = ?
                and tournament = ?
                group by loser) as ls)
                    on (p.name = ls.loser)
        where user = ? and tournament = ?
        order by
        wins desc;
        `;
    connection.query(query, [user, tournament, user, tournament, user, tournament], function (err, result) {
        connection.end();
        if (err) {
            cb(err, 0);
        }
        var out = [];
        for (var res of result) {
            out.push({
                name: res.name,
                matches: res.games_played,
                wins: res.wins
            });
        }
        cb(null, out);
    });
}

function gamesHistory(user, tournament, cb) {
    var connection = getConnection();
    var sql = 'select round, winner, loser from games where user = ? and tournament = ?';
    connection.query(sql, [user, tournament], function (err, result) {
        connection.end();
        if (err) {
            cb(err, -1);
        }
        else {
            cb(null, result);
        }
    });
}

function getNextPair(playerStandings, tournament) {
    var first = playerStandings.splice(0,1)[0];
    for (var i=0; i<playerStandings.length; i++) {
        if (!tournament.hasPlayed(first.name, playerStandings[i].name)) {
            var second = playerStandings.splice(i,1)[0];
            return [first, second];
        }
    }
}

function swissPairings(user, tournament, cb) {
    playerStandings(user, tournament, function(err, playerStandings) {
        if (err) {
            throw err;
        }
        else {
            var pairings = [];
            buildTournament(user, tournament, function(err, tournament){
                while (playerStandings.length > 0) {
                    pairings.push(getNextPair(playerStandings, tournament));
                }
                cb(null, pairings);
            });
        }
    });
}

function nextRound(user, tournament, cb) {
    var connection = getConnection();
    var sql = 'select ifnull(max(round), 0) as nxt from games where user = ? and tournament = ?';
    connection.query(sql, [user, tournament], function (err, result) {
        connection.end();
        if (err) {
            cb(err, -1);
        }
        cb(null, result[0].nxt + 1);
    });
}

function getWinner(user, tournament, cb) {
    playerStandings(user, tournament, function(err, playerStandings) {
        if (err) {
            throw err;
        }
        else {
            cb(null, playerStandings[0].name);
        }
    });
}

function getExistingPlayers(user, tournament, cb) {
    var connection = getConnection();
    var sql = 'select distinct name from players where user = ? and tournament <> ? and name not in (select name from players where user = ? and tournament = ?)';
    connection.query(sql, [user, tournament, user, tournament], function (err, result) {
        connection.end();
        if (err) {
            cb(err, -1);
        }
        cb(null, result);
    });
}

module.exports = {
    registerUser: registerUser,
    createTournament: createTournament,
    getPlayers: getPlayers,
    getTournaments: getTournaments,
    registerPlayer: registerPlayer,
    playerCount: playerCount,
    deletePlayers: deletePlayers,
    deleteMatches: deleteMatches,
    swissPairings: swissPairings,
    reportGame: reportGame,
    playerStandings: playerStandings,
    nextRound: nextRound,
    gamesHistory: gamesHistory,
    getExistingPlayers: getExistingPlayers,
    checkStatus: checkStatus,
    getWinner: getWinner
}
