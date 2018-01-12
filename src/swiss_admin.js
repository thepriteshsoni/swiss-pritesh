var mysql = require('mysql');

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

function getTopActiveUsers(nothing, cb) {
    var connection = getConnection();
    var sql =`
        select a.email, a.status, ifnull(ws.tours,0) as tours, ifnull(ms.matches, 0) as matches
        from users a
        left join
            ((select user, count(*) as tours from tournaments
            group by user) as ws)
                on (a.email = ws.user)
        left join
            ((select user, count(*) as matches from games
            group by user) as ms)
                on (a.email = ms.user)
        where a.email <> 'admin@admin'
        order by
        tours desc, matches desc
        limit 5
        `;
    connection.query(sql, function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        cb(null, result);
    });
}

function getUsers(nothing, cb) {
    var connection = getConnection();
    var sql = `select email, status from users where email <> 'admin@admin'`;
    connection.query(sql, function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        cb(null, result);
    });
}

function getUnblockedUsers(nothing, cb) {
    var connection = getConnection();
    var sql = `select email from users where status = 'ACTIVE' and email <> 'admin@admin'`;
    connection.query(sql, function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        cb(null, result);
    });
}

function blockUser(user, cb) {
    var connection = getConnection();
    var sql = 'update users set status = "SUSPENDED" where email = ?';
    connection.query(sql, user, function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        cb(null, result);
    });
}

module.exports = {
    getUsers: getUsers,
    getTopActiveUsers: getTopActiveUsers,
    blockUser: blockUser,
    getUnblockedUsers: getUnblockedUsers
}
