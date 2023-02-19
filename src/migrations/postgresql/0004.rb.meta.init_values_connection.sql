insert into meta.connection
        (environment, name, source_type, host, port, database, search_path, username, password, timeout, command_timeout, providers, protocol, comment, driver)
values ('pc_1', 'postgreql_local_01', 'postgres', 'localhost', 32771, 'rb', null, 'postgres', 'postgrespw', null, null, null, null, null, null),
       ('pc_1', 'postgreql_local_02', 'postgres', 'localhost', 5432, 'rb', null, 'postgres', 'postgrespw', null, null, null, null, null, null),
       ('pc_1', 'clickhouse_local', 'clickhouse', 'localhost', 8123, 'test_02', null, 'default', null, null, null, null, null, null, null)
on conflict do nothing
