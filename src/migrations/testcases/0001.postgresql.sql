create database test_db_1;

create schema test_schema_01;

create table test_schema_01.a (
	id serial4 primary key,
	"name" text NULL,
	"value" int NULL
);


-- init values
insert into test_schema_01.a
        (name, value)
values ('A', 1),
       ('B', 2),
       ('C', 3),
       ('D', 4),
       ('E', 5),
       ('A', null),
       (null, 1),
       ('A', null),
       ('A', 1)
on conflict do nothing;

