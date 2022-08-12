alter table "public"."tenents"
  add constraint "tenents_maintainer_id_fkey"
  foreign key ("maintainer_id")
  references "public"."user"
  ("id") on update no action on delete no action;
