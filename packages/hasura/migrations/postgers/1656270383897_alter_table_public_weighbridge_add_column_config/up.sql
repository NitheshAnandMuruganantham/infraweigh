alter table "public"."weighbridge" add column "config" json
 null default json_build_object();
