alter table "public"."vehicle" alter column "special_price_1" drop not null;
alter table "public"."vehicle" add column "special_price_1" money;
