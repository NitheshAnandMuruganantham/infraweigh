alter table "public"."vehicle" alter column "special_price_5" drop not null;
alter table "public"."vehicle" add column "special_price_5" money;
