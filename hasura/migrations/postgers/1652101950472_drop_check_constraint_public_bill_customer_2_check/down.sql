alter table "public"."bill" add constraint "customer_2_check" check (CHECK (customer_2_id <> customer_id AND customer_id <> customer_3_id));
