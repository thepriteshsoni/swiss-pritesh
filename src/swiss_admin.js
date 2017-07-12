var mysql = require('mysql');

function getConnection() {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mountblue",
        database: "swiss"
    });
    connection.connect(function (err) {
        if(err)
            throw err;
    });
    return connection;
}

function getUsers(nothing, cb) {
    var connection = getConnection();
    var sql =   `select a.username, a.status, ifnull(ws.tours,0) as tours, ifnull(ms.matches, 0) as matches
                from user a
                left join
                    ((select user, count(*) as tours from tournament
                    group by user) as ws)
                        on (a.username = ws.user)
                left join
                    ((select user, count(*) as matches from game
                    group by user) as ms)
                        on (a.username = ms.user)
                where a.username <> 'admin'
                order by
                tours desc, matches desc
                `;
    connection.query(sql, function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        console.log(result);
        cb(null, result);
    });
}

function getUnblockedUsers(nothing, cb) {
    var connection = getConnection();
    var sql = `select username from user where status = 'ACTIVE' and username <> 'admin'`;
    connection.query(sql, function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        console.log(result);
        cb(null, result);
    });
}

function blockUser(user, cb) {
    var connection = getConnection();
    var sql = 'update user set status = "SUSPENDED" where username = ?';
    connection.query(sql, user, function(err, result) {
        connection.end();
        if(err) {
            cb(err, 0);
        }
        console.log(result);
        cb(null, result);
    });
}




module.exports = {
    getUsers: getUsers,
    blockUser: blockUser,
    getUnblockedUsers: getUnblockedUsers
}
