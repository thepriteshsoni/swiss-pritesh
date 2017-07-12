exports.Game = function(user, tournament, round, winner, loser) {
    this.user = user;
    this.tournament = tournament;
    this.round = round;
    this.winner = winner;
    this.loser = loser;
}

exports.Tournament = function(user) {
    this.games = [];
}

exports.Tournament.prototype.addGame = function(game) {
    this.games.push(game);
}

exports.Tournament.prototype.hasPlayed = function(p1, p2) {
    for (var game of this.games) {
        if ((game.winner == p1 && game.loser == p2) || (game.winner == p2 && game.loser == p1)) {
            return true;
        }
    }
    return false;
}

exports.Tournament.prototype.hasPlayedInRound = function(user, tournament, round, p1, p2) {
    for (var game of this.games) {
        if (game.user == user && game.tournament == tournament && game.round == round) {
            if ((game.winner == p1 && game.loser == p2) || (game.winner == p2 && game.loser == p1)) {
                return true;
            }
        }
    }
    return false;
}
