SET check_function_bodies = false;
CREATE FUNCTION public.get_dup_emails(user_email text, user_tenent_id text) RETURNS integer
    LANGUAGE plpgsql
    AS $$    
DECLARE    
 user_count integer;  
BEGIN    
 SELECT count(*) into user_count  
 FROM public.user where email = user_tenent_id AND tenent_id = user_tenent_id;
 RETURN user_count;  
END;   
$$;
CREATE FUNCTION public.get_dup_emails(user_email text, user_tenent_id uuid) RETURNS integer
    LANGUAGE plpgsql
    AS $$    
DECLARE    
 user_count integer;  
BEGIN    
 SELECT user_count = count(*) FROM public.user where email = user_tenent_id AND tenent_id = user_tenent_id
RETURN user_count    
END;   
$$;
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
    CONSTRAINT customer_1_check CHECK (((customer_id <> customer_2_id) AND (customer_id <> customer_3_id))),
    CONSTRAINT customer_2_check CHECK (((customer_2_id <> customer_id) AND (customer_id <> customer_3_id))),
    CONSTRAINT customer_3_check CHECK (((customer_3_id <> customer_id) AND (customer_3_id <> customer_2_id))),
    CONSTRAINT not_equal_customers CHECK (((customer_id <> customer_2_id) AND (customer_id <> customer_3_id)))
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
    payment_pending boolean DEFAULT false NOT NULL
);
CREATE TABLE public."user" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    password text NOT NULL,
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
    tenent_id uuid NOT NULL
);
ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);
ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_phone_key UNIQUE (phone);
ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id, email, phone);
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
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.weighbridge
    ADD CONSTRAINT weighbridge_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.bill
    ADD CONSTRAINT bill_customer_2_id_fkey FOREIGN KEY (customer_2_id) REFERENCES public.bill(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
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
