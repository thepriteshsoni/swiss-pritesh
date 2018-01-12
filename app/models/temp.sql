create table users (
    uid int auto_increment primary key,
    email varchar(40) unique not null,
    password varchar(75),
    status varchar(10) default 'ACTIVE',
    id varchar(20) default null,
    token varchar(200) default null
);

create table tournaments (
    tid int auto_increment primary key,
    user int references users(uid),
    name varchar(40),
    unique (user, name)
);

create table players (
    pid int auto_increment primary key,
    user int references users(uid),
    name varchar(40),
    unique (user, name)
);

create table contendors (
    cid int auto_increment primary key,
    tournament int references tournaments(tid),
    contendor int references players(pid),
    unique (tournament, contendor)
);

create table games (
    gid int auto_increment primary key,
    tournament int references tournaments(tid),
    round int,
    winner int references contendors(cid),
    loser int references contendors(cid),
    unique (tournament, round, winner, loser)
);
