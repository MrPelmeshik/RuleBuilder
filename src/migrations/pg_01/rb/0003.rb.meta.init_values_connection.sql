insert into meta.connection
        (environment, name, source_type, host, port, database, search_path, username, password, timeout, command_timeout, providers, protocol, comment, driver)
values ('local', 'pg_01_rb', 'postgres', 'localhost', 5432, 'rb', null, 'postgres', 'password_pg_01', null, null, null, null, null, null)
on conflict do nothing
