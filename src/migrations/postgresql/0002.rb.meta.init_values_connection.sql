insert into test_01.meta.connection
        (environment, name, source_type, host, port, database, search_path, username, password, timeout, command_timeout, providers, protocol, comment, driver)
values ('pc_1', 'postgreql_local', 'postgres', 'localhost', 5432, 'test_01', null, 'postgres', 'postgrespw', null, null, null, null, null, null),
       ('pc_1', 'clickhouse_local', 'clickhouse', 'localhost', 8123, 'test_02', null, 'default', null, null, null, null, null, null, null)
on conflict do nothing
