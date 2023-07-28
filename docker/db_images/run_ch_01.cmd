docker run -d -p 8123:8123 --name ch_01 --ulimit nofile=8123:8123 clickhouse/clickhouse-server:22.10.2.11
docker run -it --rm --link ch_01:clickhouse-server --entrypoint clickhouse-client clickhouse/clickhouse-server:22.10.2.11 --host clickhouse-server
