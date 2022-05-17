alter table "public"."bill" add constraint "customer_1_check" check (CHECK (customer_id <> customer_2_id AND customer_id <> customer_3_id));
