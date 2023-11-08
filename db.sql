create table Posts (
    Posts_uid int not null auto_increment primary key,
    Posts_title varchar(50) not null,
    Posts_content text not null,
    Posts_writer varchar(255) not null,
    Posts_created_at datetime not null,
    Posts_hit int default 0 not null,
);

INSERT INTO Posts (Posts_title, Posts_content, Posts_writer) VALUES ('MySQL에서 데이터 삽입하기', 'MySQL INSERT 구문에 대해 배웁니다.', '홍길동');
