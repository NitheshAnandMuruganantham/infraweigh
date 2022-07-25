alter table "public"."user" add column "password" text
 null default gen_random_uuid();
