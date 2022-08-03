alter table "public"."user" alter column "synced" set default false;
alter table "public"."user" alter column "synced" drop not null;
alter table "public"."user" add column "synced" bool;
