insert into meta.connection
    (id, environment, name, source_type, host, port, database, search_path, username, password, timeout, command_timeout, providers, protocol, comment, driver)
values (1000, 'local', 'pg_02_db_01', 'postgres', 'localhost', 5433, 'db_01', null, 'postgres', 'password_pg_02', null, null, null, null, null, null)
on conflict do nothing;
insert into meta.schema
    (id, source_id, name)
values (1000, 1000, 'test_schema_01')
on conflict do nothing;
insert into meta.table
    (id, schema_id, name)
values (1000, 1000, 'a')
on conflict do nothing;