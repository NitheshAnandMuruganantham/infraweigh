alter table "public"."customer" alter column "credit_limit" set default '$0.00'::money;
alter table "public"."customer" alter column "credit_limit" drop not null;
alter table "public"."customer" add column "credit_limit" money;
