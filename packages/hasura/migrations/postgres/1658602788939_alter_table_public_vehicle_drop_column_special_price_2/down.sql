alter table "public"."vehicle" alter column "special_price_2" drop not null;
alter table "public"."vehicle" add column "special_price_2" money;
