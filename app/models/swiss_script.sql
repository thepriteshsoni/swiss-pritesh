create table users (
    email varchar(40) primary key,
    password varchar(75),
    status varchar(10) default 'ACTIVE',
    id varchar(20) default null,
    token varchar(200) default null
);

create table tournaments (
    user varchar(40) references users(email),
    name varchar(40),
    primary key (user, name)
);

create table players (
    user varchar(40) references users(email),
    tournament varchar(40) references tournaments(name),
    name varchar(40),
    primary key (user, tournament, name)
);

create table games (
    user varchar(40),
    tournament varchar(40),
    round int,
    winner varchar(40) references players(name),
    loser varchar(40) references players(name),
    constraint games_users_tournaments_FK
        foreign key (user, tournament) references tournaments(user, name),
    primary key (user, tournament, round, winner, loser)
);
