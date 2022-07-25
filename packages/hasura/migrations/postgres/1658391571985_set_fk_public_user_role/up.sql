alter table "public"."user"
  add constraint "user_role_fkey"
  foreign key ("role")
  references "public"."role"
  ("value") on update restrict on delete restrict;
