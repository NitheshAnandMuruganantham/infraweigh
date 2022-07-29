
SET check_function_bodies = false;
CREATE TABLE public.bill (
    vehicle_number text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    material_id uuid NOT NULL,
    charges money NOT NULL,
    vehicle_id uuid NOT NULL,
    weighbridge_id uuid NOT NULL,
    scale_weight integer NOT NULL,
    tare_weight integer NOT NULL,
    second_weight boolean DEFAULT false NOT NULL,
    paid_by text DEFAULT 'other'::text NOT NULL,
    reference_bill_id uuid,
    customer_id uuid,
    customer_2_id uuid,
    customer_3_id uuid,
    image text,
    tenent_id uuid NOT NULL,
    photos json DEFAULT json_build_array(),
    nano_id integer NOT NULL,
    paid boolean DEFAULT false,
    payment_initiated boolean DEFAULT false,
    driver_phone text,
    order_id text
);
CREATE FUNCTION public.net_weight_calcuation_as_integer(bill_row public.bill) RETURNS integer
    LANGUAGE sql STABLE
    AS $$
  SELECT ABS(bill_row.scale_Weight - bill_row.tare_weight)
$$;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.admin (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL
);
CREATE SEQUENCE public.bill_nano_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.bill_nano_id_seq OWNED BY public.bill.nano_id;
CREATE TABLE public.customer (
    name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    company_name text NOT NULL,
    company_address text NOT NULL,
    gst_in text,
    blocked boolean DEFAULT true NOT NULL,
    credit boolean DEFAULT false,
    credit_limit money DEFAULT '$0.00'::money,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    metadata json,
    tenent_id uuid NOT NULL
);
CREATE TABLE public.material (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    hsn text NOT NULL
);
CREATE TABLE public.tenents (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    activate boolean NOT NULL,
    metadata json DEFAULT json_build_object() NOT NULL,
    payment_pending boolean DEFAULT false NOT NULL,
    razorpay_id text NOT NULL
);
CREATE TABLE public."user" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    profile json DEFAULT json_build_object(),
    meta_data json DEFAULT json_build_object(),
    weighbridge_id uuid NOT NULL,
    synced boolean DEFAULT false,
    tenent_id uuid NOT NULL,
    email text NOT NULL,
    role text
);
CREATE TABLE public.vehicle (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    charges money NOT NULL,
    manufacturer text NOT NULL,
    special_price_1 money,
    special_price_2 money,
    special_price_3 money,
    special_price_4 money,
    special_price_5 money
);
CREATE TABLE public.weighbridge (
    name text NOT NULL,
    address text NOT NULL,
    pin_code text NOT NULL,
    logo text,
    display_name text NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    metadata json DEFAULT json_build_object() NOT NULL,
    mail text NOT NULL,
    phone text NOT NULL,
    tenent_id uuid NOT NULL,
    config json DEFAULT json_build_object()
);
ALTER TABLE ONLY public.bill ALTER COLUMN nano_id SET DEFAULT nextval('public.bill_nano_id_seq'::regclass);
ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);
ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_phone_key UNIQUE (phone);
ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id, email, phone);
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_nano_id_key UNIQUE (nano_id);
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.material
    ADD CONSTRAINT materials_hsn_key UNIQUE (hsn);
ALTER TABLE ONLY public.material
    ADD CONSTRAINT materials_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tenents
    ADD CONSTRAINT tenents_email_key UNIQUE (email);
ALTER TABLE ONLY public.tenents
    ADD CONSTRAINT tenents_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tenents
    ADD CONSTRAINT tenents_razorpay_id_key UNIQUE (razorpay_id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.weighbridge
    ADD CONSTRAINT weighbridge_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX bill_pkey_2 ON public.bill USING btree (nano_id);
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_customer_2_id_fkey FOREIGN KEY (customer_2_id) REFERENCES public.customer(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_customer_3_id_fkey FOREIGN KEY (customer_3_id) REFERENCES public.customer(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_material_id_fkey FOREIGN KEY (material_id) REFERENCES public.material(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_reference_bill_id_fkey FOREIGN KEY (reference_bill_id) REFERENCES public.bill(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_tenent_id_fkey FOREIGN KEY (tenent_id) REFERENCES public.tenents(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicle(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_weighbridge_id_fkey FOREIGN KEY (weighbridge_id) REFERENCES public.weighbridge(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_tenent_id_fkey FOREIGN KEY (tenent_id) REFERENCES public.tenents(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_tenent_id_fkey FOREIGN KEY (tenent_id) REFERENCES public.tenents(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_weighbridge_id_fkey2 FOREIGN KEY (weighbridge_id) REFERENCES public.weighbridge(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.weighbridge
    ADD CONSTRAINT weighbridge_tenent_id_fkey FOREIGN KEY (tenent_id) REFERENCES public.tenents(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

alter table "public"."user" add column "password" text
 null default gen_random_uuid();

BEGIN TRANSACTION;
ALTER TABLE "public"."user" DROP CONSTRAINT "user_pkey";

ALTER TABLE "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id", "email");
COMMIT TRANSACTION;

alter table "public"."user" add column "blocked" boolean
 null default 'false';

alter table "public"."user" add column "email_verified" boolean
 null default 'false';

alter table "public"."user" add column "refresh_token_hash" text
 null;

BEGIN TRANSACTION;
ALTER TABLE "public"."user" DROP CONSTRAINT "user_pkey";

ALTER TABLE "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;

alter table "public"."user" add column "forgot_password_token_hash" text
 null;

alter table "public"."user" alter column "weighbridge_id" drop not null;

alter table "public"."user" alter column "tenent_id" drop not null;

DROP table "public"."admin";

CREATE TABLE "public"."role" ("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );COMMENT ON TABLE "public"."role" IS E'roles of users';

INSERT INTO "public"."role"("value", "comment") VALUES (E'admin', E'admin');

INSERT INTO "public"."role"("value", "comment") VALUES (E'terminal', E'terminal');

INSERT INTO "public"."role"("value", "comment") VALUES (E'customer', E'customer');

INSERT INTO "public"."role"("value", "comment") VALUES (E'tenantAdmin', E'tenantAdmin');

INSERT INTO "public"."role"("value", "comment") VALUES (E'serviceEngineer', E'serviceEngineer');

alter table "public"."user"
  add constraint "user_role_fkey"
  foreign key ("role")
  references "public"."role"
  ("value") on update restrict on delete restrict;

alter table "public"."bill" drop column "image" cascade;

alter table "public"."bill" drop column "photos" cascade;

CREATE TABLE "public"."paid_by" ("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO "public"."paid_by"("value", "comment") VALUES (E'cash', E'cash');

INSERT INTO "public"."paid_by"("value", "comment") VALUES (E'driver', E'driver');

INSERT INTO "public"."paid_by"("value", "comment") VALUES (E'buyer', E'buyer');

INSERT INTO "public"."paid_by"("value", "comment") VALUES (E'seller', E'seller');

INSERT INTO "public"."paid_by"("value", "comment") VALUES (E'trader', E'trader');

INSERT INTO "public"."paid_by"("value", "comment") VALUES (E'other', E'other');

alter table "public"."bill"
  add constraint "bill_paid_by_fkey"
  foreign key ("paid_by")
  references "public"."paid_by"
  ("value") on update restrict on delete restrict;

alter table "public"."vehicle" drop column "special_price_5" cascade;

alter table "public"."vehicle" drop column "special_price_4" cascade;

alter table "public"."vehicle" drop column "special_price_3" cascade;

alter table "public"."vehicle" drop column "special_price_2" cascade;

alter table "public"."vehicle" drop column "charges" cascade;

alter table "public"."vehicle" drop column "special_price_1" cascade;
