
alter table "public"."vehicle" alter column "special_price_1" drop not null;
alter table "public"."vehicle" add column "special_price_1" money;

alter table "public"."vehicle" alter column "charges" drop not null;
alter table "public"."vehicle" add column "charges" money;

alter table "public"."vehicle" alter column "special_price_2" drop not null;
alter table "public"."vehicle" add column "special_price_2" money;

alter table "public"."vehicle" alter column "special_price_3" drop not null;
alter table "public"."vehicle" add column "special_price_3" money;

alter table "public"."vehicle" alter column "special_price_4" drop not null;
alter table "public"."vehicle" add column "special_price_4" money;

alter table "public"."vehicle" alter column "special_price_5" drop not null;
alter table "public"."vehicle" add column "special_price_5" money;

alter table "public"."bill" drop constraint "bill_paid_by_fkey";

DELETE FROM "public"."paid_by" WHERE "value" = 'other';

DELETE FROM "public"."paid_by" WHERE "value" = 'trader';

DELETE FROM "public"."paid_by" WHERE "value" = 'seller';

DELETE FROM "public"."paid_by" WHERE "value" = 'buyer';

DELETE FROM "public"."paid_by" WHERE "value" = 'driver';

DELETE FROM "public"."paid_by" WHERE "value" = 'cash';

DROP TABLE "public"."paid_by";

alter table "public"."bill" alter column "photos" set default json_build_array();
alter table "public"."bill" alter column "photos" drop not null;
alter table "public"."bill" add column "photos" json;

alter table "public"."bill" alter column "image" drop not null;
alter table "public"."bill" add column "image" text;

alter table "public"."user" drop constraint "user_role_fkey";

DELETE FROM "public"."role" WHERE "value" = 'serviceEngineer';

DELETE FROM "public"."role" WHERE "value" = 'tenantAdmin';

DELETE FROM "public"."role" WHERE "value" = 'customer';

DELETE FROM "public"."role" WHERE "value" = 'terminal';

DELETE FROM "public"."role" WHERE "value" = 'admin';

DROP TABLE "public"."role";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."admin";

alter table "public"."user" alter column "tenent_id" set not null;

alter table "public"."user" alter column "weighbridge_id" set not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user" add column "forgot_password_token_hash" text
--  null;

alter table "public"."user" drop constraint "user_pkey";
alter table "public"."user"
    add constraint "user_pkey"
    primary key ("id", "email");

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user" add column "refresh_token_hash" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user" add column "email_verified" boolean
--  null default 'false';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user" add column "blocked" boolean
--  null default 'false';

alter table "public"."user" drop constraint "user_pkey";
alter table "public"."user"
    add constraint "user_pkey"
    primary key ("id");

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user" add column "password" text
--  null default gen_random_uuid();
