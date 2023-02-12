create schema meta;

create table meta."connection" (
	id serial4 NOT NULL,
	environment text NULL,
	"name" text NULL,
	source_type text NULL,
	host text NULL,
	port int4 NULL,
	"database" text NULL,
	search_path text NULL,
	username text NULL,
	"password" text NULL,
	timeout int4 NULL,
	command_timeout int4 NULL,
	no_reset_on_close bool NULL DEFAULT true,
	providers text NULL,
	protocol text NULL,
	"comment" text NULL,
	driver text NULL,
	CONSTRAINT connection_environment_name_key UNIQUE (environment, name),
	CONSTRAINT connection_pkey PRIMARY KEY (id)
);
