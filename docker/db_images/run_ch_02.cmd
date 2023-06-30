docker run -d -p 8124:8123 --name ch_02 --ulimit nofile=8124:8123 clickhouse/clickhouse-server:22.10.2.11
docker run -it --rm --link ch_02:clickhouse-server --entrypoint clickhouse-client clickhouse/clickhouse-server:22.10.2.11 --host clickhouse-server
