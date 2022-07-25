alter table "public"."bill"
  add constraint "bill_paid_by_fkey"
  foreign key ("paid_by")
  references "public"."paid_by"
  ("value") on update restrict on delete restrict;
