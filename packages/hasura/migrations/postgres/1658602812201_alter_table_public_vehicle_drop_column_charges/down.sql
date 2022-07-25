alter table "public"."vehicle" alter column "charges" drop not null;
alter table "public"."vehicle" add column "charges" money;
