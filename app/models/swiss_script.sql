create table user (
    username varchar(40) primary key,
    status varchar(10)
);

create table tournament (
    user varchar(40) references user(username),
    name varchar(40),
    primary key (user, name)
);

create table player (
    user varchar(40) references user(username),
    tournament varchar(40) references tournament(name),
    name varchar(40),
    primary key (user, tournament, name)
);

create table game (
    user varchar(40),
    tournament varchar(40),
    round int,
    winner varchar(40) references player(name),
    loser varchar(40) references player(name),
    constraint game_user_tournament_FK foreign key (user, tournament) references tournament(user, name),
    primary key (user, tournament, round, winner, loser)
);
