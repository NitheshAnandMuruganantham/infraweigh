alter table "public"."weighbridge" alter column "config" set default '{"camera":[],"url":""}'::json;
alter table "public"."weighbridge" alter column "config" drop not null;
alter table "public"."weighbridge" add column "config" json;
