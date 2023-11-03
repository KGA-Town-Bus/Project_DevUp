create table Posts (
    Posts_uid int not null auto_increment primary key,
    Posts_title varchar(50) not null,
    Posts_content text not null,
    Posts_writer varchar(255) not null,
    Posts_created_at datetime not null,
    Posts_hit int default 0 not null,
    Posts_like int default 0 not null
);