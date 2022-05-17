alter table "public"."bill" drop constraint "bill_customer_2_id_fkey",
  add constraint "bill_customer_2_id_fkey"
  foreign key ("customer_2_id")
  references "public"."bill"
  ("id") on update restrict on delete restrict;
