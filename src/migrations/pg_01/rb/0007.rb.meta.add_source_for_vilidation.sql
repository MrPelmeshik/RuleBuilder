insert into meta.connection
    (id, environment, name, source_type, host, port, database, search_path, username, password, timeout, command_timeout, providers, protocol, comment, driver)
values (1001, 'local', 'ch_01', 'clickhouse', 'localhost', 8123, 'default', null, 'default', null, null, null, null, null, null, null)
on conflict do nothing;