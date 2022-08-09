alter table "public"."customer" alter column "credit" set default false;
alter table "public"."customer" alter column "credit" drop not null;
alter table "public"."customer" add column "credit" bool;
