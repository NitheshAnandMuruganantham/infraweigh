alter table "public"."bill" add constraint "not_equal_customers" check (CHECK (customer_id <> customer_2_id AND customer_id <> customer_3_id));
