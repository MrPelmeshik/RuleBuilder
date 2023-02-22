create table meta.schema (
	id serial4 primary key,
	source_id int NULL references meta.connection (id),
	"name" text NULL
);