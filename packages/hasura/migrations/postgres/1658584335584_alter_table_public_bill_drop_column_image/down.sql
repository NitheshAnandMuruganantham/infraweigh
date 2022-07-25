alter table "public"."bill" alter column "image" drop not null;
alter table "public"."bill" add column "image" text;
