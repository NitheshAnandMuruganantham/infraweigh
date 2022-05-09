alter table "public"."bill" add constraint "customer_3_check" check (CHECK (customer_3_id <> customer_id AND customer_3_id <> customer_2_id));
