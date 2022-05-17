alter table "public"."user" alter column "password" set default 'null';
alter table "public"."user" alter column "password" drop not null;
