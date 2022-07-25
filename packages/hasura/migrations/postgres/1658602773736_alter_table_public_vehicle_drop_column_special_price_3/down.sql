alter table "public"."vehicle" alter column "special_price_3" drop not null;
alter table "public"."vehicle" add column "special_price_3" money;
