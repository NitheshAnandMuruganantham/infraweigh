alter table "public"."tenents" alter column "maintainer_id" drop not null;
alter table "public"."tenents" add column "maintainer_id" uuid;
