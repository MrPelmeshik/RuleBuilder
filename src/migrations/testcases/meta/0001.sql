insert into rb.meta.connection
    (id, environment, name, source_type, host, port, database, search_path, username, password, timeout, command_timeout, providers, protocol, comment, driver)
values (1000, 'pc_1', 'testcase_01', 'postgres', 'localhost', 5432, 'test_db_1', null, 'postgres', 'postgrespw', null, null, null, null, null, null)
on conflict do nothing;
insert into rb.meta.schema
    (id, source_id, name)
values (1000, 1000, 'test_schema_01')
on conflict do nothing;
insert into rb.meta.table
    (id, schema_id, name)
values (1000, 1000, 'a')
on conflict do nothing;