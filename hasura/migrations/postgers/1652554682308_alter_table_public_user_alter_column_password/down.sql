alter table "public"."user" alter column "password" set not null;
ALTER TABLE "public"."user" ALTER COLUMN "password" drop default;
