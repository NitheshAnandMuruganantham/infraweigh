alter table "public"."bill" alter column "photos" set default json_build_array();
alter table "public"."bill" alter column "photos" drop not null;
alter table "public"."bill" add column "photos" json;
