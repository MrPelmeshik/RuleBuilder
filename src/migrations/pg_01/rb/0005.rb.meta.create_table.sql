create table meta."table" (
	id serial4 primary key,
	schema_id int NULL references meta."schema" (id),
	"name" text NULL
);