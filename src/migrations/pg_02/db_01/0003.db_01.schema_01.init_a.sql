insert into schema_01.a (name, value)
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