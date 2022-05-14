alter table "public"."user" alter column "password" set default ''null'::text';
alter table "public"."user" alter column "password" drop not null;
alter table "public"."user" add column "password" text;
