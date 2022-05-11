import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  json: any;
  money: any;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "admin" */
export type Admin = {
  __typename?: 'admin';
  email: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

/** aggregated selection of "admin" */
export type Admin_Aggregate = {
  __typename?: 'admin_aggregate';
  aggregate?: Maybe<Admin_Aggregate_Fields>;
  nodes: Array<Admin>;
};

/** aggregate fields of "admin" */
export type Admin_Aggregate_Fields = {
  __typename?: 'admin_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Admin_Max_Fields>;
  min?: Maybe<Admin_Min_Fields>;
};


/** aggregate fields of "admin" */
export type Admin_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Admin_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "admin". All fields are combined with a logical 'AND'. */
export type Admin_Bool_Exp = {
  _and?: InputMaybe<Array<Admin_Bool_Exp>>;
  _not?: InputMaybe<Admin_Bool_Exp>;
  _or?: InputMaybe<Array<Admin_Bool_Exp>>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "admin" */
export enum Admin_Constraint {
  /** unique or primary key constraint */
  AdminEmailKey = 'admin_email_key',
  /** unique or primary key constraint */
  AdminPhoneKey = 'admin_phone_key',
  /** unique or primary key constraint */
  AdminPkey = 'admin_pkey'
}

/** input type for inserting data into table "admin" */
export type Admin_Insert_Input = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Admin_Max_Fields = {
  __typename?: 'admin_max_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Admin_Min_Fields = {
  __typename?: 'admin_min_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "admin" */
export type Admin_Mutation_Response = {
  __typename?: 'admin_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Admin>;
};

/** on_conflict condition type for table "admin" */
export type Admin_On_Conflict = {
  constraint: Admin_Constraint;
  update_columns?: Array<Admin_Update_Column>;
  where?: InputMaybe<Admin_Bool_Exp>;
};

/** Ordering options when selecting data from "admin". */
export type Admin_Order_By = {
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
};

/** primary key columns input for table: admin */
export type Admin_Pk_Columns_Input = {
  email: Scalars['String'];
  id: Scalars['uuid'];
  phone: Scalars['String'];
};

/** select columns of table "admin" */
export enum Admin_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone'
}

/** input type for updating data in table "admin" */
export type Admin_Set_Input = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

/** update columns of table "admin" */
export enum Admin_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone'
}

/** columns and relationships of "bill" */
export type Bill = {
  __typename?: 'bill';
  /** An object relationship */
  billByReferenceBillId?: Maybe<Bill>;
  /** An array relationship */
  billsByReferenceBillId: Array<Bill>;
  /** An aggregate relationship */
  billsByReferenceBillId_aggregate: Bill_Aggregate;
  charges: Scalars['money'];
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  customer?: Maybe<Customer>;
  /** An object relationship */
  customerByCustomerId?: Maybe<Customer>;
  /** An object relationship */
  customer_2?: Maybe<Customer>;
  customer_2_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  customer_3?: Maybe<Customer>;
  customer_3_id?: Maybe<Scalars['uuid']>;
  customer_id?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  image?: Maybe<Scalars['String']>;
  /** An object relationship */
  material: Material;
  material_id: Scalars['uuid'];
  nano_id: Scalars['Int'];
  paid_by: Scalars['String'];
  photos?: Maybe<Scalars['json']>;
  reference_bill_id?: Maybe<Scalars['uuid']>;
  scale_weight: Scalars['Int'];
  second_weight: Scalars['Boolean'];
  tare_weight: Scalars['Int'];
  /** An object relationship */
  tenent: Tenents;
  tenent_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  vehicle: Vehicle;
  vehicle_id: Scalars['uuid'];
  vehicle_number: Scalars['String'];
  /** An object relationship */
  weighbridge: Weighbridge;
  weighbridge_id: Scalars['uuid'];
};


/** columns and relationships of "bill" */
export type BillBillsByReferenceBillIdArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "bill" */
export type BillBillsByReferenceBillId_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "bill" */
export type BillPhotosArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "bill" */
export type Bill_Aggregate = {
  __typename?: 'bill_aggregate';
  aggregate?: Maybe<Bill_Aggregate_Fields>;
  nodes: Array<Bill>;
};

/** aggregate fields of "bill" */
export type Bill_Aggregate_Fields = {
  __typename?: 'bill_aggregate_fields';
  avg?: Maybe<Bill_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Bill_Max_Fields>;
  min?: Maybe<Bill_Min_Fields>;
  stddev?: Maybe<Bill_Stddev_Fields>;
  stddev_pop?: Maybe<Bill_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Bill_Stddev_Samp_Fields>;
  sum?: Maybe<Bill_Sum_Fields>;
  var_pop?: Maybe<Bill_Var_Pop_Fields>;
  var_samp?: Maybe<Bill_Var_Samp_Fields>;
  variance?: Maybe<Bill_Variance_Fields>;
};


/** aggregate fields of "bill" */
export type Bill_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Bill_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "bill" */
export type Bill_Aggregate_Order_By = {
  avg?: InputMaybe<Bill_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Bill_Max_Order_By>;
  min?: InputMaybe<Bill_Min_Order_By>;
  stddev?: InputMaybe<Bill_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Bill_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Bill_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Bill_Sum_Order_By>;
  var_pop?: InputMaybe<Bill_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Bill_Var_Samp_Order_By>;
  variance?: InputMaybe<Bill_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "bill" */
export type Bill_Arr_Rel_Insert_Input = {
  data: Array<Bill_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Bill_On_Conflict>;
};

/** aggregate avg on columns */
export type Bill_Avg_Fields = {
  __typename?: 'bill_avg_fields';
  charges?: Maybe<Scalars['Float']>;
  nano_id?: Maybe<Scalars['Float']>;
  scale_weight?: Maybe<Scalars['Float']>;
  tare_weight?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "bill" */
export type Bill_Avg_Order_By = {
  charges?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "bill". All fields are combined with a logical 'AND'. */
export type Bill_Bool_Exp = {
  _and?: InputMaybe<Array<Bill_Bool_Exp>>;
  _not?: InputMaybe<Bill_Bool_Exp>;
  _or?: InputMaybe<Array<Bill_Bool_Exp>>;
  billByReferenceBillId?: InputMaybe<Bill_Bool_Exp>;
  billsByReferenceBillId?: InputMaybe<Bill_Bool_Exp>;
  charges?: InputMaybe<Money_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  customer?: InputMaybe<Customer_Bool_Exp>;
  customerByCustomerId?: InputMaybe<Customer_Bool_Exp>;
  customer_2?: InputMaybe<Customer_Bool_Exp>;
  customer_2_id?: InputMaybe<Uuid_Comparison_Exp>;
  customer_3?: InputMaybe<Customer_Bool_Exp>;
  customer_3_id?: InputMaybe<Uuid_Comparison_Exp>;
  customer_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  material?: InputMaybe<Material_Bool_Exp>;
  material_id?: InputMaybe<Uuid_Comparison_Exp>;
  nano_id?: InputMaybe<Int_Comparison_Exp>;
  paid_by?: InputMaybe<String_Comparison_Exp>;
  photos?: InputMaybe<Json_Comparison_Exp>;
  reference_bill_id?: InputMaybe<Uuid_Comparison_Exp>;
  scale_weight?: InputMaybe<Int_Comparison_Exp>;
  second_weight?: InputMaybe<Boolean_Comparison_Exp>;
  tare_weight?: InputMaybe<Int_Comparison_Exp>;
  tenent?: InputMaybe<Tenents_Bool_Exp>;
  tenent_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  vehicle?: InputMaybe<Vehicle_Bool_Exp>;
  vehicle_id?: InputMaybe<Uuid_Comparison_Exp>;
  vehicle_number?: InputMaybe<String_Comparison_Exp>;
  weighbridge?: InputMaybe<Weighbridge_Bool_Exp>;
  weighbridge_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "bill" */
export enum Bill_Constraint {
  /** unique or primary key constraint */
  BillNanoIdKey = 'bill_nano_id_key',
  /** unique or primary key constraint */
  BillPkey = 'bill_pkey'
}

/** input type for incrementing numeric columns in table "bill" */
export type Bill_Inc_Input = {
  charges?: InputMaybe<Scalars['money']>;
  nano_id?: InputMaybe<Scalars['Int']>;
  scale_weight?: InputMaybe<Scalars['Int']>;
  tare_weight?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "bill" */
export type Bill_Insert_Input = {
  billByReferenceBillId?: InputMaybe<Bill_Obj_Rel_Insert_Input>;
  billsByReferenceBillId?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  charges?: InputMaybe<Scalars['money']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  customer?: InputMaybe<Customer_Obj_Rel_Insert_Input>;
  customerByCustomerId?: InputMaybe<Customer_Obj_Rel_Insert_Input>;
  customer_2?: InputMaybe<Customer_Obj_Rel_Insert_Input>;
  customer_2_id?: InputMaybe<Scalars['uuid']>;
  customer_3?: InputMaybe<Customer_Obj_Rel_Insert_Input>;
  customer_3_id?: InputMaybe<Scalars['uuid']>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  material?: InputMaybe<Material_Obj_Rel_Insert_Input>;
  material_id?: InputMaybe<Scalars['uuid']>;
  nano_id?: InputMaybe<Scalars['Int']>;
  paid_by?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<Scalars['json']>;
  reference_bill_id?: InputMaybe<Scalars['uuid']>;
  scale_weight?: InputMaybe<Scalars['Int']>;
  second_weight?: InputMaybe<Scalars['Boolean']>;
  tare_weight?: InputMaybe<Scalars['Int']>;
  tenent?: InputMaybe<Tenents_Obj_Rel_Insert_Input>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  vehicle?: InputMaybe<Vehicle_Obj_Rel_Insert_Input>;
  vehicle_id?: InputMaybe<Scalars['uuid']>;
  vehicle_number?: InputMaybe<Scalars['String']>;
  weighbridge?: InputMaybe<Weighbridge_Obj_Rel_Insert_Input>;
  weighbridge_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Bill_Max_Fields = {
  __typename?: 'bill_max_fields';
  charges?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  customer_2_id?: Maybe<Scalars['uuid']>;
  customer_3_id?: Maybe<Scalars['uuid']>;
  customer_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  material_id?: Maybe<Scalars['uuid']>;
  nano_id?: Maybe<Scalars['Int']>;
  paid_by?: Maybe<Scalars['String']>;
  reference_bill_id?: Maybe<Scalars['uuid']>;
  scale_weight?: Maybe<Scalars['Int']>;
  tare_weight?: Maybe<Scalars['Int']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  vehicle_id?: Maybe<Scalars['uuid']>;
  vehicle_number?: Maybe<Scalars['String']>;
  weighbridge_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "bill" */
export type Bill_Max_Order_By = {
  charges?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer_2_id?: InputMaybe<Order_By>;
  customer_3_id?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  paid_by?: InputMaybe<Order_By>;
  reference_bill_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vehicle_id?: InputMaybe<Order_By>;
  vehicle_number?: InputMaybe<Order_By>;
  weighbridge_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Bill_Min_Fields = {
  __typename?: 'bill_min_fields';
  charges?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  customer_2_id?: Maybe<Scalars['uuid']>;
  customer_3_id?: Maybe<Scalars['uuid']>;
  customer_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  material_id?: Maybe<Scalars['uuid']>;
  nano_id?: Maybe<Scalars['Int']>;
  paid_by?: Maybe<Scalars['String']>;
  reference_bill_id?: Maybe<Scalars['uuid']>;
  scale_weight?: Maybe<Scalars['Int']>;
  tare_weight?: Maybe<Scalars['Int']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  vehicle_id?: Maybe<Scalars['uuid']>;
  vehicle_number?: Maybe<Scalars['String']>;
  weighbridge_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "bill" */
export type Bill_Min_Order_By = {
  charges?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer_2_id?: InputMaybe<Order_By>;
  customer_3_id?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  paid_by?: InputMaybe<Order_By>;
  reference_bill_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vehicle_id?: InputMaybe<Order_By>;
  vehicle_number?: InputMaybe<Order_By>;
  weighbridge_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "bill" */
export type Bill_Mutation_Response = {
  __typename?: 'bill_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Bill>;
};

/** input type for inserting object relation for remote table "bill" */
export type Bill_Obj_Rel_Insert_Input = {
  data: Bill_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Bill_On_Conflict>;
};

/** on_conflict condition type for table "bill" */
export type Bill_On_Conflict = {
  constraint: Bill_Constraint;
  update_columns?: Array<Bill_Update_Column>;
  where?: InputMaybe<Bill_Bool_Exp>;
};

/** Ordering options when selecting data from "bill". */
export type Bill_Order_By = {
  billByReferenceBillId?: InputMaybe<Bill_Order_By>;
  billsByReferenceBillId_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  charges?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer?: InputMaybe<Customer_Order_By>;
  customerByCustomerId?: InputMaybe<Customer_Order_By>;
  customer_2?: InputMaybe<Customer_Order_By>;
  customer_2_id?: InputMaybe<Order_By>;
  customer_3?: InputMaybe<Customer_Order_By>;
  customer_3_id?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  material?: InputMaybe<Material_Order_By>;
  material_id?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  paid_by?: InputMaybe<Order_By>;
  photos?: InputMaybe<Order_By>;
  reference_bill_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  second_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
  tenent?: InputMaybe<Tenents_Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  vehicle?: InputMaybe<Vehicle_Order_By>;
  vehicle_id?: InputMaybe<Order_By>;
  vehicle_number?: InputMaybe<Order_By>;
  weighbridge?: InputMaybe<Weighbridge_Order_By>;
  weighbridge_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: bill */
export type Bill_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "bill" */
export enum Bill_Select_Column {
  /** column name */
  Charges = 'charges',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Customer_2Id = 'customer_2_id',
  /** column name */
  Customer_3Id = 'customer_3_id',
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  MaterialId = 'material_id',
  /** column name */
  NanoId = 'nano_id',
  /** column name */
  PaidBy = 'paid_by',
  /** column name */
  Photos = 'photos',
  /** column name */
  ReferenceBillId = 'reference_bill_id',
  /** column name */
  ScaleWeight = 'scale_weight',
  /** column name */
  SecondWeight = 'second_weight',
  /** column name */
  TareWeight = 'tare_weight',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VehicleId = 'vehicle_id',
  /** column name */
  VehicleNumber = 'vehicle_number',
  /** column name */
  WeighbridgeId = 'weighbridge_id'
}

/** input type for updating data in table "bill" */
export type Bill_Set_Input = {
  charges?: InputMaybe<Scalars['money']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  customer_2_id?: InputMaybe<Scalars['uuid']>;
  customer_3_id?: InputMaybe<Scalars['uuid']>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  material_id?: InputMaybe<Scalars['uuid']>;
  nano_id?: InputMaybe<Scalars['Int']>;
  paid_by?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<Scalars['json']>;
  reference_bill_id?: InputMaybe<Scalars['uuid']>;
  scale_weight?: InputMaybe<Scalars['Int']>;
  second_weight?: InputMaybe<Scalars['Boolean']>;
  tare_weight?: InputMaybe<Scalars['Int']>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  vehicle_id?: InputMaybe<Scalars['uuid']>;
  vehicle_number?: InputMaybe<Scalars['String']>;
  weighbridge_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Bill_Stddev_Fields = {
  __typename?: 'bill_stddev_fields';
  charges?: Maybe<Scalars['Float']>;
  nano_id?: Maybe<Scalars['Float']>;
  scale_weight?: Maybe<Scalars['Float']>;
  tare_weight?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "bill" */
export type Bill_Stddev_Order_By = {
  charges?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Bill_Stddev_Pop_Fields = {
  __typename?: 'bill_stddev_pop_fields';
  charges?: Maybe<Scalars['Float']>;
  nano_id?: Maybe<Scalars['Float']>;
  scale_weight?: Maybe<Scalars['Float']>;
  tare_weight?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "bill" */
export type Bill_Stddev_Pop_Order_By = {
  charges?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Bill_Stddev_Samp_Fields = {
  __typename?: 'bill_stddev_samp_fields';
  charges?: Maybe<Scalars['Float']>;
  nano_id?: Maybe<Scalars['Float']>;
  scale_weight?: Maybe<Scalars['Float']>;
  tare_weight?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "bill" */
export type Bill_Stddev_Samp_Order_By = {
  charges?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Bill_Sum_Fields = {
  __typename?: 'bill_sum_fields';
  charges?: Maybe<Scalars['money']>;
  nano_id?: Maybe<Scalars['Int']>;
  scale_weight?: Maybe<Scalars['Int']>;
  tare_weight?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "bill" */
export type Bill_Sum_Order_By = {
  charges?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
};

/** update columns of table "bill" */
export enum Bill_Update_Column {
  /** column name */
  Charges = 'charges',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Customer_2Id = 'customer_2_id',
  /** column name */
  Customer_3Id = 'customer_3_id',
  /** column name */
  CustomerId = 'customer_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  MaterialId = 'material_id',
  /** column name */
  NanoId = 'nano_id',
  /** column name */
  PaidBy = 'paid_by',
  /** column name */
  Photos = 'photos',
  /** column name */
  ReferenceBillId = 'reference_bill_id',
  /** column name */
  ScaleWeight = 'scale_weight',
  /** column name */
  SecondWeight = 'second_weight',
  /** column name */
  TareWeight = 'tare_weight',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  VehicleId = 'vehicle_id',
  /** column name */
  VehicleNumber = 'vehicle_number',
  /** column name */
  WeighbridgeId = 'weighbridge_id'
}

/** aggregate var_pop on columns */
export type Bill_Var_Pop_Fields = {
  __typename?: 'bill_var_pop_fields';
  charges?: Maybe<Scalars['Float']>;
  nano_id?: Maybe<Scalars['Float']>;
  scale_weight?: Maybe<Scalars['Float']>;
  tare_weight?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "bill" */
export type Bill_Var_Pop_Order_By = {
  charges?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Bill_Var_Samp_Fields = {
  __typename?: 'bill_var_samp_fields';
  charges?: Maybe<Scalars['Float']>;
  nano_id?: Maybe<Scalars['Float']>;
  scale_weight?: Maybe<Scalars['Float']>;
  tare_weight?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "bill" */
export type Bill_Var_Samp_Order_By = {
  charges?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Bill_Variance_Fields = {
  __typename?: 'bill_variance_fields';
  charges?: Maybe<Scalars['Float']>;
  nano_id?: Maybe<Scalars['Float']>;
  scale_weight?: Maybe<Scalars['Float']>;
  tare_weight?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "bill" */
export type Bill_Variance_Order_By = {
  charges?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  scale_weight?: InputMaybe<Order_By>;
  tare_weight?: InputMaybe<Order_By>;
};

/** columns and relationships of "customer" */
export type Customer = {
  __typename?: 'customer';
  /** An array relationship */
  bills_2: Array<Bill>;
  /** An aggregate relationship */
  bills_2_aggregate: Bill_Aggregate;
  /** An array relationship */
  bills_3: Array<Bill>;
  /** An aggregate relationship */
  bills_3_aggregate: Bill_Aggregate;
  /** An array relationship */
  bills_id: Array<Bill>;
  /** An aggregate relationship */
  bills_id_aggregate: Bill_Aggregate;
  blocked: Scalars['Boolean'];
  company_address: Scalars['String'];
  company_name: Scalars['String'];
  created_at: Scalars['timestamptz'];
  credit?: Maybe<Scalars['Boolean']>;
  credit_limit?: Maybe<Scalars['money']>;
  email: Scalars['String'];
  gst_in?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  metadata?: Maybe<Scalars['json']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  /** An object relationship */
  tenent: Tenents;
  tenent_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "customer" */
export type CustomerBills_2Args = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "customer" */
export type CustomerBills_2_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "customer" */
export type CustomerBills_3Args = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "customer" */
export type CustomerBills_3_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "customer" */
export type CustomerBills_IdArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "customer" */
export type CustomerBills_Id_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "customer" */
export type CustomerMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "customer" */
export type Customer_Aggregate = {
  __typename?: 'customer_aggregate';
  aggregate?: Maybe<Customer_Aggregate_Fields>;
  nodes: Array<Customer>;
};

/** aggregate fields of "customer" */
export type Customer_Aggregate_Fields = {
  __typename?: 'customer_aggregate_fields';
  avg?: Maybe<Customer_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Customer_Max_Fields>;
  min?: Maybe<Customer_Min_Fields>;
  stddev?: Maybe<Customer_Stddev_Fields>;
  stddev_pop?: Maybe<Customer_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Customer_Stddev_Samp_Fields>;
  sum?: Maybe<Customer_Sum_Fields>;
  var_pop?: Maybe<Customer_Var_Pop_Fields>;
  var_samp?: Maybe<Customer_Var_Samp_Fields>;
  variance?: Maybe<Customer_Variance_Fields>;
};


/** aggregate fields of "customer" */
export type Customer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Customer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "customer" */
export type Customer_Aggregate_Order_By = {
  avg?: InputMaybe<Customer_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Customer_Max_Order_By>;
  min?: InputMaybe<Customer_Min_Order_By>;
  stddev?: InputMaybe<Customer_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Customer_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Customer_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Customer_Sum_Order_By>;
  var_pop?: InputMaybe<Customer_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Customer_Var_Samp_Order_By>;
  variance?: InputMaybe<Customer_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "customer" */
export type Customer_Arr_Rel_Insert_Input = {
  data: Array<Customer_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Customer_On_Conflict>;
};

/** aggregate avg on columns */
export type Customer_Avg_Fields = {
  __typename?: 'customer_avg_fields';
  credit_limit?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "customer" */
export type Customer_Avg_Order_By = {
  credit_limit?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "customer". All fields are combined with a logical 'AND'. */
export type Customer_Bool_Exp = {
  _and?: InputMaybe<Array<Customer_Bool_Exp>>;
  _not?: InputMaybe<Customer_Bool_Exp>;
  _or?: InputMaybe<Array<Customer_Bool_Exp>>;
  bills_2?: InputMaybe<Bill_Bool_Exp>;
  bills_3?: InputMaybe<Bill_Bool_Exp>;
  bills_id?: InputMaybe<Bill_Bool_Exp>;
  blocked?: InputMaybe<Boolean_Comparison_Exp>;
  company_address?: InputMaybe<String_Comparison_Exp>;
  company_name?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  credit?: InputMaybe<Boolean_Comparison_Exp>;
  credit_limit?: InputMaybe<Money_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  gst_in?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  tenent?: InputMaybe<Tenents_Bool_Exp>;
  tenent_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "customer" */
export enum Customer_Constraint {
  /** unique or primary key constraint */
  CustomerPkey = 'customer_pkey'
}

/** input type for incrementing numeric columns in table "customer" */
export type Customer_Inc_Input = {
  credit_limit?: InputMaybe<Scalars['money']>;
};

/** input type for inserting data into table "customer" */
export type Customer_Insert_Input = {
  bills_2?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  bills_3?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  bills_id?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  blocked?: InputMaybe<Scalars['Boolean']>;
  company_address?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  credit?: InputMaybe<Scalars['Boolean']>;
  credit_limit?: InputMaybe<Scalars['money']>;
  email?: InputMaybe<Scalars['String']>;
  gst_in?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  tenent?: InputMaybe<Tenents_Obj_Rel_Insert_Input>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Customer_Max_Fields = {
  __typename?: 'customer_max_fields';
  company_address?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  credit_limit?: Maybe<Scalars['money']>;
  email?: Maybe<Scalars['String']>;
  gst_in?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "customer" */
export type Customer_Max_Order_By = {
  company_address?: InputMaybe<Order_By>;
  company_name?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  credit_limit?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  gst_in?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Customer_Min_Fields = {
  __typename?: 'customer_min_fields';
  company_address?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  credit_limit?: Maybe<Scalars['money']>;
  email?: Maybe<Scalars['String']>;
  gst_in?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "customer" */
export type Customer_Min_Order_By = {
  company_address?: InputMaybe<Order_By>;
  company_name?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  credit_limit?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  gst_in?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "customer" */
export type Customer_Mutation_Response = {
  __typename?: 'customer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Customer>;
};

/** input type for inserting object relation for remote table "customer" */
export type Customer_Obj_Rel_Insert_Input = {
  data: Customer_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Customer_On_Conflict>;
};

/** on_conflict condition type for table "customer" */
export type Customer_On_Conflict = {
  constraint: Customer_Constraint;
  update_columns?: Array<Customer_Update_Column>;
  where?: InputMaybe<Customer_Bool_Exp>;
};

/** Ordering options when selecting data from "customer". */
export type Customer_Order_By = {
  bills_2_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  bills_3_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  bills_id_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  blocked?: InputMaybe<Order_By>;
  company_address?: InputMaybe<Order_By>;
  company_name?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  credit?: InputMaybe<Order_By>;
  credit_limit?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  gst_in?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  tenent?: InputMaybe<Tenents_Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: customer */
export type Customer_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "customer" */
export enum Customer_Select_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  CompanyAddress = 'company_address',
  /** column name */
  CompanyName = 'company_name',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Credit = 'credit',
  /** column name */
  CreditLimit = 'credit_limit',
  /** column name */
  Email = 'email',
  /** column name */
  GstIn = 'gst_in',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "customer" */
export type Customer_Set_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  company_address?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  credit?: InputMaybe<Scalars['Boolean']>;
  credit_limit?: InputMaybe<Scalars['money']>;
  email?: InputMaybe<Scalars['String']>;
  gst_in?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Customer_Stddev_Fields = {
  __typename?: 'customer_stddev_fields';
  credit_limit?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "customer" */
export type Customer_Stddev_Order_By = {
  credit_limit?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Customer_Stddev_Pop_Fields = {
  __typename?: 'customer_stddev_pop_fields';
  credit_limit?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "customer" */
export type Customer_Stddev_Pop_Order_By = {
  credit_limit?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Customer_Stddev_Samp_Fields = {
  __typename?: 'customer_stddev_samp_fields';
  credit_limit?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "customer" */
export type Customer_Stddev_Samp_Order_By = {
  credit_limit?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Customer_Sum_Fields = {
  __typename?: 'customer_sum_fields';
  credit_limit?: Maybe<Scalars['money']>;
};

/** order by sum() on columns of table "customer" */
export type Customer_Sum_Order_By = {
  credit_limit?: InputMaybe<Order_By>;
};

/** update columns of table "customer" */
export enum Customer_Update_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  CompanyAddress = 'company_address',
  /** column name */
  CompanyName = 'company_name',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Credit = 'credit',
  /** column name */
  CreditLimit = 'credit_limit',
  /** column name */
  Email = 'email',
  /** column name */
  GstIn = 'gst_in',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Customer_Var_Pop_Fields = {
  __typename?: 'customer_var_pop_fields';
  credit_limit?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "customer" */
export type Customer_Var_Pop_Order_By = {
  credit_limit?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Customer_Var_Samp_Fields = {
  __typename?: 'customer_var_samp_fields';
  credit_limit?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "customer" */
export type Customer_Var_Samp_Order_By = {
  credit_limit?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Customer_Variance_Fields = {
  __typename?: 'customer_variance_fields';
  credit_limit?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "customer" */
export type Customer_Variance_Order_By = {
  credit_limit?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

/** columns and relationships of "material" */
export type Material = {
  __typename?: 'material';
  /** An array relationship */
  bills: Array<Bill>;
  /** An aggregate relationship */
  bills_aggregate: Bill_Aggregate;
  created_at: Scalars['timestamptz'];
  hsn: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "material" */
export type MaterialBillsArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "material" */
export type MaterialBills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};

/** aggregated selection of "material" */
export type Material_Aggregate = {
  __typename?: 'material_aggregate';
  aggregate?: Maybe<Material_Aggregate_Fields>;
  nodes: Array<Material>;
};

/** aggregate fields of "material" */
export type Material_Aggregate_Fields = {
  __typename?: 'material_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Material_Max_Fields>;
  min?: Maybe<Material_Min_Fields>;
};


/** aggregate fields of "material" */
export type Material_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Material_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "material". All fields are combined with a logical 'AND'. */
export type Material_Bool_Exp = {
  _and?: InputMaybe<Array<Material_Bool_Exp>>;
  _not?: InputMaybe<Material_Bool_Exp>;
  _or?: InputMaybe<Array<Material_Bool_Exp>>;
  bills?: InputMaybe<Bill_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  hsn?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "material" */
export enum Material_Constraint {
  /** unique or primary key constraint */
  MaterialsHsnKey = 'materials_hsn_key',
  /** unique or primary key constraint */
  MaterialsPkey = 'materials_pkey'
}

/** input type for inserting data into table "material" */
export type Material_Insert_Input = {
  bills?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  hsn?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Material_Max_Fields = {
  __typename?: 'material_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  hsn?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Material_Min_Fields = {
  __typename?: 'material_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  hsn?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "material" */
export type Material_Mutation_Response = {
  __typename?: 'material_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Material>;
};

/** input type for inserting object relation for remote table "material" */
export type Material_Obj_Rel_Insert_Input = {
  data: Material_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Material_On_Conflict>;
};

/** on_conflict condition type for table "material" */
export type Material_On_Conflict = {
  constraint: Material_Constraint;
  update_columns?: Array<Material_Update_Column>;
  where?: InputMaybe<Material_Bool_Exp>;
};

/** Ordering options when selecting data from "material". */
export type Material_Order_By = {
  bills_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  hsn?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: material */
export type Material_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "material" */
export enum Material_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Hsn = 'hsn',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "material" */
export type Material_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  hsn?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "material" */
export enum Material_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Hsn = 'hsn',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Boolean expression to compare columns of type "money". All fields are combined with logical 'AND'. */
export type Money_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['money']>;
  _gt?: InputMaybe<Scalars['money']>;
  _gte?: InputMaybe<Scalars['money']>;
  _in?: InputMaybe<Array<Scalars['money']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['money']>;
  _lte?: InputMaybe<Scalars['money']>;
  _neq?: InputMaybe<Scalars['money']>;
  _nin?: InputMaybe<Array<Scalars['money']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "admin" */
  delete_admin?: Maybe<Admin_Mutation_Response>;
  /** delete single row from the table: "admin" */
  delete_admin_by_pk?: Maybe<Admin>;
  /** delete data from the table: "bill" */
  delete_bill?: Maybe<Bill_Mutation_Response>;
  /** delete single row from the table: "bill" */
  delete_bill_by_pk?: Maybe<Bill>;
  /** delete data from the table: "customer" */
  delete_customer?: Maybe<Customer_Mutation_Response>;
  /** delete single row from the table: "customer" */
  delete_customer_by_pk?: Maybe<Customer>;
  /** delete data from the table: "material" */
  delete_material?: Maybe<Material_Mutation_Response>;
  /** delete single row from the table: "material" */
  delete_material_by_pk?: Maybe<Material>;
  /** delete data from the table: "tenents" */
  delete_tenents?: Maybe<Tenents_Mutation_Response>;
  /** delete single row from the table: "tenents" */
  delete_tenents_by_pk?: Maybe<Tenents>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "vehicle" */
  delete_vehicle?: Maybe<Vehicle_Mutation_Response>;
  /** delete single row from the table: "vehicle" */
  delete_vehicle_by_pk?: Maybe<Vehicle>;
  /** delete data from the table: "weighbridge" */
  delete_weighbridge?: Maybe<Weighbridge_Mutation_Response>;
  /** delete single row from the table: "weighbridge" */
  delete_weighbridge_by_pk?: Maybe<Weighbridge>;
  /** insert data into the table: "admin" */
  insert_admin?: Maybe<Admin_Mutation_Response>;
  /** insert a single row into the table: "admin" */
  insert_admin_one?: Maybe<Admin>;
  /** insert data into the table: "bill" */
  insert_bill?: Maybe<Bill_Mutation_Response>;
  /** insert a single row into the table: "bill" */
  insert_bill_one?: Maybe<Bill>;
  /** insert data into the table: "customer" */
  insert_customer?: Maybe<Customer_Mutation_Response>;
  /** insert a single row into the table: "customer" */
  insert_customer_one?: Maybe<Customer>;
  /** insert data into the table: "material" */
  insert_material?: Maybe<Material_Mutation_Response>;
  /** insert a single row into the table: "material" */
  insert_material_one?: Maybe<Material>;
  /** insert data into the table: "tenents" */
  insert_tenents?: Maybe<Tenents_Mutation_Response>;
  /** insert a single row into the table: "tenents" */
  insert_tenents_one?: Maybe<Tenents>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** insert data into the table: "vehicle" */
  insert_vehicle?: Maybe<Vehicle_Mutation_Response>;
  /** insert a single row into the table: "vehicle" */
  insert_vehicle_one?: Maybe<Vehicle>;
  /** insert data into the table: "weighbridge" */
  insert_weighbridge?: Maybe<Weighbridge_Mutation_Response>;
  /** insert a single row into the table: "weighbridge" */
  insert_weighbridge_one?: Maybe<Weighbridge>;
  /** update data of the table: "admin" */
  update_admin?: Maybe<Admin_Mutation_Response>;
  /** update single row of the table: "admin" */
  update_admin_by_pk?: Maybe<Admin>;
  /** update data of the table: "bill" */
  update_bill?: Maybe<Bill_Mutation_Response>;
  /** update single row of the table: "bill" */
  update_bill_by_pk?: Maybe<Bill>;
  /** update data of the table: "customer" */
  update_customer?: Maybe<Customer_Mutation_Response>;
  /** update single row of the table: "customer" */
  update_customer_by_pk?: Maybe<Customer>;
  /** update data of the table: "material" */
  update_material?: Maybe<Material_Mutation_Response>;
  /** update single row of the table: "material" */
  update_material_by_pk?: Maybe<Material>;
  /** update data of the table: "tenents" */
  update_tenents?: Maybe<Tenents_Mutation_Response>;
  /** update single row of the table: "tenents" */
  update_tenents_by_pk?: Maybe<Tenents>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update data of the table: "vehicle" */
  update_vehicle?: Maybe<Vehicle_Mutation_Response>;
  /** update single row of the table: "vehicle" */
  update_vehicle_by_pk?: Maybe<Vehicle>;
  /** update data of the table: "weighbridge" */
  update_weighbridge?: Maybe<Weighbridge_Mutation_Response>;
  /** update single row of the table: "weighbridge" */
  update_weighbridge_by_pk?: Maybe<Weighbridge>;
};


/** mutation root */
export type Mutation_RootDelete_AdminArgs = {
  where: Admin_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Admin_By_PkArgs = {
  email: Scalars['String'];
  id: Scalars['uuid'];
  phone: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_BillArgs = {
  where: Bill_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Bill_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CustomerArgs = {
  where: Customer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Customer_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_MaterialArgs = {
  where: Material_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Material_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_TenentsArgs = {
  where: Tenents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tenents_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_VehicleArgs = {
  where: Vehicle_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Vehicle_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_WeighbridgeArgs = {
  where: Weighbridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Weighbridge_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_AdminArgs = {
  objects: Array<Admin_Insert_Input>;
  on_conflict?: InputMaybe<Admin_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Admin_OneArgs = {
  object: Admin_Insert_Input;
  on_conflict?: InputMaybe<Admin_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BillArgs = {
  objects: Array<Bill_Insert_Input>;
  on_conflict?: InputMaybe<Bill_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Bill_OneArgs = {
  object: Bill_Insert_Input;
  on_conflict?: InputMaybe<Bill_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CustomerArgs = {
  objects: Array<Customer_Insert_Input>;
  on_conflict?: InputMaybe<Customer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Customer_OneArgs = {
  object: Customer_Insert_Input;
  on_conflict?: InputMaybe<Customer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MaterialArgs = {
  objects: Array<Material_Insert_Input>;
  on_conflict?: InputMaybe<Material_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Material_OneArgs = {
  object: Material_Insert_Input;
  on_conflict?: InputMaybe<Material_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TenentsArgs = {
  objects: Array<Tenents_Insert_Input>;
  on_conflict?: InputMaybe<Tenents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tenents_OneArgs = {
  object: Tenents_Insert_Input;
  on_conflict?: InputMaybe<Tenents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_VehicleArgs = {
  objects: Array<Vehicle_Insert_Input>;
  on_conflict?: InputMaybe<Vehicle_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Vehicle_OneArgs = {
  object: Vehicle_Insert_Input;
  on_conflict?: InputMaybe<Vehicle_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WeighbridgeArgs = {
  objects: Array<Weighbridge_Insert_Input>;
  on_conflict?: InputMaybe<Weighbridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Weighbridge_OneArgs = {
  object: Weighbridge_Insert_Input;
  on_conflict?: InputMaybe<Weighbridge_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AdminArgs = {
  _set?: InputMaybe<Admin_Set_Input>;
  where: Admin_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Admin_By_PkArgs = {
  _set?: InputMaybe<Admin_Set_Input>;
  pk_columns: Admin_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BillArgs = {
  _inc?: InputMaybe<Bill_Inc_Input>;
  _set?: InputMaybe<Bill_Set_Input>;
  where: Bill_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Bill_By_PkArgs = {
  _inc?: InputMaybe<Bill_Inc_Input>;
  _set?: InputMaybe<Bill_Set_Input>;
  pk_columns: Bill_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CustomerArgs = {
  _inc?: InputMaybe<Customer_Inc_Input>;
  _set?: InputMaybe<Customer_Set_Input>;
  where: Customer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Customer_By_PkArgs = {
  _inc?: InputMaybe<Customer_Inc_Input>;
  _set?: InputMaybe<Customer_Set_Input>;
  pk_columns: Customer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_MaterialArgs = {
  _set?: InputMaybe<Material_Set_Input>;
  where: Material_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Material_By_PkArgs = {
  _set?: InputMaybe<Material_Set_Input>;
  pk_columns: Material_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TenentsArgs = {
  _set?: InputMaybe<Tenents_Set_Input>;
  where: Tenents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tenents_By_PkArgs = {
  _set?: InputMaybe<Tenents_Set_Input>;
  pk_columns: Tenents_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_VehicleArgs = {
  _inc?: InputMaybe<Vehicle_Inc_Input>;
  _set?: InputMaybe<Vehicle_Set_Input>;
  where: Vehicle_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vehicle_By_PkArgs = {
  _inc?: InputMaybe<Vehicle_Inc_Input>;
  _set?: InputMaybe<Vehicle_Set_Input>;
  pk_columns: Vehicle_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WeighbridgeArgs = {
  _set?: InputMaybe<Weighbridge_Set_Input>;
  where: Weighbridge_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Weighbridge_By_PkArgs = {
  _set?: InputMaybe<Weighbridge_Set_Input>;
  pk_columns: Weighbridge_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "admin" */
  admin: Array<Admin>;
  /** fetch aggregated fields from the table: "admin" */
  admin_aggregate: Admin_Aggregate;
  /** fetch data from the table: "admin" using primary key columns */
  admin_by_pk?: Maybe<Admin>;
  /** fetch data from the table: "bill" */
  bill: Array<Bill>;
  /** fetch aggregated fields from the table: "bill" */
  bill_aggregate: Bill_Aggregate;
  /** fetch data from the table: "bill" using primary key columns */
  bill_by_pk?: Maybe<Bill>;
  /** fetch data from the table: "customer" */
  customer: Array<Customer>;
  /** fetch aggregated fields from the table: "customer" */
  customer_aggregate: Customer_Aggregate;
  /** fetch data from the table: "customer" using primary key columns */
  customer_by_pk?: Maybe<Customer>;
  /** fetch data from the table: "material" */
  material: Array<Material>;
  /** fetch aggregated fields from the table: "material" */
  material_aggregate: Material_Aggregate;
  /** fetch data from the table: "material" using primary key columns */
  material_by_pk?: Maybe<Material>;
  /** fetch data from the table: "tenents" */
  tenents: Array<Tenents>;
  /** fetch aggregated fields from the table: "tenents" */
  tenents_aggregate: Tenents_Aggregate;
  /** fetch data from the table: "tenents" using primary key columns */
  tenents_by_pk?: Maybe<Tenents>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "vehicle" */
  vehicle: Array<Vehicle>;
  /** fetch aggregated fields from the table: "vehicle" */
  vehicle_aggregate: Vehicle_Aggregate;
  /** fetch data from the table: "vehicle" using primary key columns */
  vehicle_by_pk?: Maybe<Vehicle>;
  /** fetch data from the table: "weighbridge" */
  weighbridge: Array<Weighbridge>;
  /** fetch aggregated fields from the table: "weighbridge" */
  weighbridge_aggregate: Weighbridge_Aggregate;
  /** fetch data from the table: "weighbridge" using primary key columns */
  weighbridge_by_pk?: Maybe<Weighbridge>;
};


export type Query_RootAdminArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Query_RootAdmin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Query_RootAdmin_By_PkArgs = {
  email: Scalars['String'];
  id: Scalars['uuid'];
  phone: Scalars['String'];
};


export type Query_RootBillArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


export type Query_RootBill_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


export type Query_RootBill_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCustomerArgs = {
  distinct_on?: InputMaybe<Array<Customer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customer_Order_By>>;
  where?: InputMaybe<Customer_Bool_Exp>;
};


export type Query_RootCustomer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Customer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customer_Order_By>>;
  where?: InputMaybe<Customer_Bool_Exp>;
};


export type Query_RootCustomer_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMaterialArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


export type Query_RootMaterial_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


export type Query_RootMaterial_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTenentsArgs = {
  distinct_on?: InputMaybe<Array<Tenents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenents_Order_By>>;
  where?: InputMaybe<Tenents_Bool_Exp>;
};


export type Query_RootTenents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenents_Order_By>>;
  where?: InputMaybe<Tenents_Bool_Exp>;
};


export type Query_RootTenents_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVehicleArgs = {
  distinct_on?: InputMaybe<Array<Vehicle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vehicle_Order_By>>;
  where?: InputMaybe<Vehicle_Bool_Exp>;
};


export type Query_RootVehicle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vehicle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vehicle_Order_By>>;
  where?: InputMaybe<Vehicle_Bool_Exp>;
};


export type Query_RootVehicle_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWeighbridgeArgs = {
  distinct_on?: InputMaybe<Array<Weighbridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Weighbridge_Order_By>>;
  where?: InputMaybe<Weighbridge_Bool_Exp>;
};


export type Query_RootWeighbridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weighbridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Weighbridge_Order_By>>;
  where?: InputMaybe<Weighbridge_Bool_Exp>;
};


export type Query_RootWeighbridge_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "admin" */
  admin: Array<Admin>;
  /** fetch aggregated fields from the table: "admin" */
  admin_aggregate: Admin_Aggregate;
  /** fetch data from the table: "admin" using primary key columns */
  admin_by_pk?: Maybe<Admin>;
  /** fetch data from the table: "bill" */
  bill: Array<Bill>;
  /** fetch aggregated fields from the table: "bill" */
  bill_aggregate: Bill_Aggregate;
  /** fetch data from the table: "bill" using primary key columns */
  bill_by_pk?: Maybe<Bill>;
  /** fetch data from the table: "customer" */
  customer: Array<Customer>;
  /** fetch aggregated fields from the table: "customer" */
  customer_aggregate: Customer_Aggregate;
  /** fetch data from the table: "customer" using primary key columns */
  customer_by_pk?: Maybe<Customer>;
  /** fetch data from the table: "material" */
  material: Array<Material>;
  /** fetch aggregated fields from the table: "material" */
  material_aggregate: Material_Aggregate;
  /** fetch data from the table: "material" using primary key columns */
  material_by_pk?: Maybe<Material>;
  /** fetch data from the table: "tenents" */
  tenents: Array<Tenents>;
  /** fetch aggregated fields from the table: "tenents" */
  tenents_aggregate: Tenents_Aggregate;
  /** fetch data from the table: "tenents" using primary key columns */
  tenents_by_pk?: Maybe<Tenents>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "vehicle" */
  vehicle: Array<Vehicle>;
  /** fetch aggregated fields from the table: "vehicle" */
  vehicle_aggregate: Vehicle_Aggregate;
  /** fetch data from the table: "vehicle" using primary key columns */
  vehicle_by_pk?: Maybe<Vehicle>;
  /** fetch data from the table: "weighbridge" */
  weighbridge: Array<Weighbridge>;
  /** fetch aggregated fields from the table: "weighbridge" */
  weighbridge_aggregate: Weighbridge_Aggregate;
  /** fetch data from the table: "weighbridge" using primary key columns */
  weighbridge_by_pk?: Maybe<Weighbridge>;
};


export type Subscription_RootAdminArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Subscription_RootAdmin_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Admin_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Admin_Order_By>>;
  where?: InputMaybe<Admin_Bool_Exp>;
};


export type Subscription_RootAdmin_By_PkArgs = {
  email: Scalars['String'];
  id: Scalars['uuid'];
  phone: Scalars['String'];
};


export type Subscription_RootBillArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


export type Subscription_RootBill_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


export type Subscription_RootBill_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCustomerArgs = {
  distinct_on?: InputMaybe<Array<Customer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customer_Order_By>>;
  where?: InputMaybe<Customer_Bool_Exp>;
};


export type Subscription_RootCustomer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Customer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customer_Order_By>>;
  where?: InputMaybe<Customer_Bool_Exp>;
};


export type Subscription_RootCustomer_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootMaterialArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


export type Subscription_RootMaterial_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Material_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Material_Order_By>>;
  where?: InputMaybe<Material_Bool_Exp>;
};


export type Subscription_RootMaterial_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTenentsArgs = {
  distinct_on?: InputMaybe<Array<Tenents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenents_Order_By>>;
  where?: InputMaybe<Tenents_Bool_Exp>;
};


export type Subscription_RootTenents_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenents_Order_By>>;
  where?: InputMaybe<Tenents_Bool_Exp>;
};


export type Subscription_RootTenents_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootVehicleArgs = {
  distinct_on?: InputMaybe<Array<Vehicle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vehicle_Order_By>>;
  where?: InputMaybe<Vehicle_Bool_Exp>;
};


export type Subscription_RootVehicle_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Vehicle_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Vehicle_Order_By>>;
  where?: InputMaybe<Vehicle_Bool_Exp>;
};


export type Subscription_RootVehicle_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootWeighbridgeArgs = {
  distinct_on?: InputMaybe<Array<Weighbridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Weighbridge_Order_By>>;
  where?: InputMaybe<Weighbridge_Bool_Exp>;
};


export type Subscription_RootWeighbridge_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weighbridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Weighbridge_Order_By>>;
  where?: InputMaybe<Weighbridge_Bool_Exp>;
};


export type Subscription_RootWeighbridge_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "tenents" */
export type Tenents = {
  __typename?: 'tenents';
  activate: Scalars['Boolean'];
  /** An array relationship */
  bills: Array<Bill>;
  /** An aggregate relationship */
  bills_aggregate: Bill_Aggregate;
  /** An array relationship */
  customers: Array<Customer>;
  /** An aggregate relationship */
  customers_aggregate: Customer_Aggregate;
  email: Scalars['String'];
  id: Scalars['uuid'];
  metadata: Scalars['json'];
  name: Scalars['String'];
  payment_pending: Scalars['Boolean'];
  phone: Scalars['String'];
  /** An array relationship */
  users: Array<User>;
  /** An aggregate relationship */
  users_aggregate: User_Aggregate;
  /** An array relationship */
  weighbridges: Array<Weighbridge>;
  /** An aggregate relationship */
  weighbridges_aggregate: Weighbridge_Aggregate;
};


/** columns and relationships of "tenents" */
export type TenentsBillsArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "tenents" */
export type TenentsBills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "tenents" */
export type TenentsCustomersArgs = {
  distinct_on?: InputMaybe<Array<Customer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customer_Order_By>>;
  where?: InputMaybe<Customer_Bool_Exp>;
};


/** columns and relationships of "tenents" */
export type TenentsCustomers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Customer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Customer_Order_By>>;
  where?: InputMaybe<Customer_Bool_Exp>;
};


/** columns and relationships of "tenents" */
export type TenentsMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "tenents" */
export type TenentsUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


/** columns and relationships of "tenents" */
export type TenentsUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


/** columns and relationships of "tenents" */
export type TenentsWeighbridgesArgs = {
  distinct_on?: InputMaybe<Array<Weighbridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Weighbridge_Order_By>>;
  where?: InputMaybe<Weighbridge_Bool_Exp>;
};


/** columns and relationships of "tenents" */
export type TenentsWeighbridges_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Weighbridge_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Weighbridge_Order_By>>;
  where?: InputMaybe<Weighbridge_Bool_Exp>;
};

/** aggregated selection of "tenents" */
export type Tenents_Aggregate = {
  __typename?: 'tenents_aggregate';
  aggregate?: Maybe<Tenents_Aggregate_Fields>;
  nodes: Array<Tenents>;
};

/** aggregate fields of "tenents" */
export type Tenents_Aggregate_Fields = {
  __typename?: 'tenents_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Tenents_Max_Fields>;
  min?: Maybe<Tenents_Min_Fields>;
};


/** aggregate fields of "tenents" */
export type Tenents_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tenents_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "tenents". All fields are combined with a logical 'AND'. */
export type Tenents_Bool_Exp = {
  _and?: InputMaybe<Array<Tenents_Bool_Exp>>;
  _not?: InputMaybe<Tenents_Bool_Exp>;
  _or?: InputMaybe<Array<Tenents_Bool_Exp>>;
  activate?: InputMaybe<Boolean_Comparison_Exp>;
  bills?: InputMaybe<Bill_Bool_Exp>;
  customers?: InputMaybe<Customer_Bool_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  payment_pending?: InputMaybe<Boolean_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  users?: InputMaybe<User_Bool_Exp>;
  weighbridges?: InputMaybe<Weighbridge_Bool_Exp>;
};

/** unique or primary key constraints on table "tenents" */
export enum Tenents_Constraint {
  /** unique or primary key constraint */
  TenentsEmailKey = 'tenents_email_key',
  /** unique or primary key constraint */
  TenentsPkey = 'tenents_pkey'
}

/** input type for inserting data into table "tenents" */
export type Tenents_Insert_Input = {
  activate?: InputMaybe<Scalars['Boolean']>;
  bills?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  customers?: InputMaybe<Customer_Arr_Rel_Insert_Input>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  payment_pending?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<User_Arr_Rel_Insert_Input>;
  weighbridges?: InputMaybe<Weighbridge_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Tenents_Max_Fields = {
  __typename?: 'tenents_max_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Tenents_Min_Fields = {
  __typename?: 'tenents_min_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "tenents" */
export type Tenents_Mutation_Response = {
  __typename?: 'tenents_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Tenents>;
};

/** input type for inserting object relation for remote table "tenents" */
export type Tenents_Obj_Rel_Insert_Input = {
  data: Tenents_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Tenents_On_Conflict>;
};

/** on_conflict condition type for table "tenents" */
export type Tenents_On_Conflict = {
  constraint: Tenents_Constraint;
  update_columns?: Array<Tenents_Update_Column>;
  where?: InputMaybe<Tenents_Bool_Exp>;
};

/** Ordering options when selecting data from "tenents". */
export type Tenents_Order_By = {
  activate?: InputMaybe<Order_By>;
  bills_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  customers_aggregate?: InputMaybe<Customer_Aggregate_Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  payment_pending?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<User_Aggregate_Order_By>;
  weighbridges_aggregate?: InputMaybe<Weighbridge_Aggregate_Order_By>;
};

/** primary key columns input for table: tenents */
export type Tenents_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "tenents" */
export enum Tenents_Select_Column {
  /** column name */
  Activate = 'activate',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Name = 'name',
  /** column name */
  PaymentPending = 'payment_pending',
  /** column name */
  Phone = 'phone'
}

/** input type for updating data in table "tenents" */
export type Tenents_Set_Input = {
  activate?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  payment_pending?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
};

/** update columns of table "tenents" */
export enum Tenents_Update_Column {
  /** column name */
  Activate = 'activate',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Name = 'name',
  /** column name */
  PaymentPending = 'payment_pending',
  /** column name */
  Phone = 'phone'
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['uuid'];
  meta_data?: Maybe<Scalars['json']>;
  password: Scalars['String'];
  profile?: Maybe<Scalars['json']>;
  role?: Maybe<Scalars['String']>;
  synced?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  tenent: Tenents;
  tenent_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  weighbridge: Weighbridge;
  weighbridge_id: Scalars['uuid'];
};


/** columns and relationships of "user" */
export type UserMeta_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user" */
export type UserProfileArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Max_Order_By>;
  min?: InputMaybe<User_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  meta_data?: InputMaybe<Json_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  profile?: InputMaybe<Json_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  synced?: InputMaybe<Boolean_Comparison_Exp>;
  tenent?: InputMaybe<Tenents_Bool_Exp>;
  tenent_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  weighbridge?: InputMaybe<Weighbridge_Bool_Exp>;
  weighbridge_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserEmailKey = 'user_email_key',
  /** unique or primary key constraint */
  UserPkey = 'user_pkey'
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  meta_data?: InputMaybe<Scalars['json']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['json']>;
  role?: InputMaybe<Scalars['String']>;
  synced?: InputMaybe<Scalars['Boolean']>;
  tenent?: InputMaybe<Tenents_Obj_Rel_Insert_Input>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weighbridge?: InputMaybe<Weighbridge_Obj_Rel_Insert_Input>;
  weighbridge_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  weighbridge_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  weighbridge_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  weighbridge_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  weighbridge_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  meta_data?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  profile?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  synced?: InputMaybe<Order_By>;
  tenent?: InputMaybe<Tenents_Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  weighbridge?: InputMaybe<Weighbridge_Order_By>;
  weighbridge_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  MetaData = 'meta_data',
  /** column name */
  Password = 'password',
  /** column name */
  Profile = 'profile',
  /** column name */
  Role = 'role',
  /** column name */
  Synced = 'synced',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WeighbridgeId = 'weighbridge_id'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  meta_data?: InputMaybe<Scalars['json']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['json']>;
  role?: InputMaybe<Scalars['String']>;
  synced?: InputMaybe<Scalars['Boolean']>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weighbridge_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  MetaData = 'meta_data',
  /** column name */
  Password = 'password',
  /** column name */
  Profile = 'profile',
  /** column name */
  Role = 'role',
  /** column name */
  Synced = 'synced',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WeighbridgeId = 'weighbridge_id'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "vehicle" */
export type Vehicle = {
  __typename?: 'vehicle';
  /** An array relationship */
  bills: Array<Bill>;
  /** An aggregate relationship */
  bills_aggregate: Bill_Aggregate;
  charges: Scalars['money'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  manufacturer: Scalars['String'];
  name: Scalars['String'];
  special_price_1?: Maybe<Scalars['money']>;
  special_price_2?: Maybe<Scalars['money']>;
  special_price_3?: Maybe<Scalars['money']>;
  special_price_4?: Maybe<Scalars['money']>;
  special_price_5?: Maybe<Scalars['money']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "vehicle" */
export type VehicleBillsArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "vehicle" */
export type VehicleBills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};

/** aggregated selection of "vehicle" */
export type Vehicle_Aggregate = {
  __typename?: 'vehicle_aggregate';
  aggregate?: Maybe<Vehicle_Aggregate_Fields>;
  nodes: Array<Vehicle>;
};

/** aggregate fields of "vehicle" */
export type Vehicle_Aggregate_Fields = {
  __typename?: 'vehicle_aggregate_fields';
  avg?: Maybe<Vehicle_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Vehicle_Max_Fields>;
  min?: Maybe<Vehicle_Min_Fields>;
  stddev?: Maybe<Vehicle_Stddev_Fields>;
  stddev_pop?: Maybe<Vehicle_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Vehicle_Stddev_Samp_Fields>;
  sum?: Maybe<Vehicle_Sum_Fields>;
  var_pop?: Maybe<Vehicle_Var_Pop_Fields>;
  var_samp?: Maybe<Vehicle_Var_Samp_Fields>;
  variance?: Maybe<Vehicle_Variance_Fields>;
};


/** aggregate fields of "vehicle" */
export type Vehicle_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vehicle_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Vehicle_Avg_Fields = {
  __typename?: 'vehicle_avg_fields';
  charges?: Maybe<Scalars['Float']>;
  special_price_1?: Maybe<Scalars['Float']>;
  special_price_2?: Maybe<Scalars['Float']>;
  special_price_3?: Maybe<Scalars['Float']>;
  special_price_4?: Maybe<Scalars['Float']>;
  special_price_5?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "vehicle". All fields are combined with a logical 'AND'. */
export type Vehicle_Bool_Exp = {
  _and?: InputMaybe<Array<Vehicle_Bool_Exp>>;
  _not?: InputMaybe<Vehicle_Bool_Exp>;
  _or?: InputMaybe<Array<Vehicle_Bool_Exp>>;
  bills?: InputMaybe<Bill_Bool_Exp>;
  charges?: InputMaybe<Money_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  manufacturer?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  special_price_1?: InputMaybe<Money_Comparison_Exp>;
  special_price_2?: InputMaybe<Money_Comparison_Exp>;
  special_price_3?: InputMaybe<Money_Comparison_Exp>;
  special_price_4?: InputMaybe<Money_Comparison_Exp>;
  special_price_5?: InputMaybe<Money_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "vehicle" */
export enum Vehicle_Constraint {
  /** unique or primary key constraint */
  VehiclePkey = 'vehicle_pkey'
}

/** input type for incrementing numeric columns in table "vehicle" */
export type Vehicle_Inc_Input = {
  charges?: InputMaybe<Scalars['money']>;
  special_price_1?: InputMaybe<Scalars['money']>;
  special_price_2?: InputMaybe<Scalars['money']>;
  special_price_3?: InputMaybe<Scalars['money']>;
  special_price_4?: InputMaybe<Scalars['money']>;
  special_price_5?: InputMaybe<Scalars['money']>;
};

/** input type for inserting data into table "vehicle" */
export type Vehicle_Insert_Input = {
  bills?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  charges?: InputMaybe<Scalars['money']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  special_price_1?: InputMaybe<Scalars['money']>;
  special_price_2?: InputMaybe<Scalars['money']>;
  special_price_3?: InputMaybe<Scalars['money']>;
  special_price_4?: InputMaybe<Scalars['money']>;
  special_price_5?: InputMaybe<Scalars['money']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Vehicle_Max_Fields = {
  __typename?: 'vehicle_max_fields';
  charges?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  manufacturer?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  special_price_1?: Maybe<Scalars['money']>;
  special_price_2?: Maybe<Scalars['money']>;
  special_price_3?: Maybe<Scalars['money']>;
  special_price_4?: Maybe<Scalars['money']>;
  special_price_5?: Maybe<Scalars['money']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Vehicle_Min_Fields = {
  __typename?: 'vehicle_min_fields';
  charges?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  manufacturer?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  special_price_1?: Maybe<Scalars['money']>;
  special_price_2?: Maybe<Scalars['money']>;
  special_price_3?: Maybe<Scalars['money']>;
  special_price_4?: Maybe<Scalars['money']>;
  special_price_5?: Maybe<Scalars['money']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "vehicle" */
export type Vehicle_Mutation_Response = {
  __typename?: 'vehicle_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Vehicle>;
};

/** input type for inserting object relation for remote table "vehicle" */
export type Vehicle_Obj_Rel_Insert_Input = {
  data: Vehicle_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Vehicle_On_Conflict>;
};

/** on_conflict condition type for table "vehicle" */
export type Vehicle_On_Conflict = {
  constraint: Vehicle_Constraint;
  update_columns?: Array<Vehicle_Update_Column>;
  where?: InputMaybe<Vehicle_Bool_Exp>;
};

/** Ordering options when selecting data from "vehicle". */
export type Vehicle_Order_By = {
  bills_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  charges?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manufacturer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  special_price_1?: InputMaybe<Order_By>;
  special_price_2?: InputMaybe<Order_By>;
  special_price_3?: InputMaybe<Order_By>;
  special_price_4?: InputMaybe<Order_By>;
  special_price_5?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vehicle */
export type Vehicle_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "vehicle" */
export enum Vehicle_Select_Column {
  /** column name */
  Charges = 'charges',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  Name = 'name',
  /** column name */
  SpecialPrice_1 = 'special_price_1',
  /** column name */
  SpecialPrice_2 = 'special_price_2',
  /** column name */
  SpecialPrice_3 = 'special_price_3',
  /** column name */
  SpecialPrice_4 = 'special_price_4',
  /** column name */
  SpecialPrice_5 = 'special_price_5',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "vehicle" */
export type Vehicle_Set_Input = {
  charges?: InputMaybe<Scalars['money']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  special_price_1?: InputMaybe<Scalars['money']>;
  special_price_2?: InputMaybe<Scalars['money']>;
  special_price_3?: InputMaybe<Scalars['money']>;
  special_price_4?: InputMaybe<Scalars['money']>;
  special_price_5?: InputMaybe<Scalars['money']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Vehicle_Stddev_Fields = {
  __typename?: 'vehicle_stddev_fields';
  charges?: Maybe<Scalars['Float']>;
  special_price_1?: Maybe<Scalars['Float']>;
  special_price_2?: Maybe<Scalars['Float']>;
  special_price_3?: Maybe<Scalars['Float']>;
  special_price_4?: Maybe<Scalars['Float']>;
  special_price_5?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Vehicle_Stddev_Pop_Fields = {
  __typename?: 'vehicle_stddev_pop_fields';
  charges?: Maybe<Scalars['Float']>;
  special_price_1?: Maybe<Scalars['Float']>;
  special_price_2?: Maybe<Scalars['Float']>;
  special_price_3?: Maybe<Scalars['Float']>;
  special_price_4?: Maybe<Scalars['Float']>;
  special_price_5?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Vehicle_Stddev_Samp_Fields = {
  __typename?: 'vehicle_stddev_samp_fields';
  charges?: Maybe<Scalars['Float']>;
  special_price_1?: Maybe<Scalars['Float']>;
  special_price_2?: Maybe<Scalars['Float']>;
  special_price_3?: Maybe<Scalars['Float']>;
  special_price_4?: Maybe<Scalars['Float']>;
  special_price_5?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Vehicle_Sum_Fields = {
  __typename?: 'vehicle_sum_fields';
  charges?: Maybe<Scalars['money']>;
  special_price_1?: Maybe<Scalars['money']>;
  special_price_2?: Maybe<Scalars['money']>;
  special_price_3?: Maybe<Scalars['money']>;
  special_price_4?: Maybe<Scalars['money']>;
  special_price_5?: Maybe<Scalars['money']>;
};

/** update columns of table "vehicle" */
export enum Vehicle_Update_Column {
  /** column name */
  Charges = 'charges',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  Name = 'name',
  /** column name */
  SpecialPrice_1 = 'special_price_1',
  /** column name */
  SpecialPrice_2 = 'special_price_2',
  /** column name */
  SpecialPrice_3 = 'special_price_3',
  /** column name */
  SpecialPrice_4 = 'special_price_4',
  /** column name */
  SpecialPrice_5 = 'special_price_5',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Vehicle_Var_Pop_Fields = {
  __typename?: 'vehicle_var_pop_fields';
  charges?: Maybe<Scalars['Float']>;
  special_price_1?: Maybe<Scalars['Float']>;
  special_price_2?: Maybe<Scalars['Float']>;
  special_price_3?: Maybe<Scalars['Float']>;
  special_price_4?: Maybe<Scalars['Float']>;
  special_price_5?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Vehicle_Var_Samp_Fields = {
  __typename?: 'vehicle_var_samp_fields';
  charges?: Maybe<Scalars['Float']>;
  special_price_1?: Maybe<Scalars['Float']>;
  special_price_2?: Maybe<Scalars['Float']>;
  special_price_3?: Maybe<Scalars['Float']>;
  special_price_4?: Maybe<Scalars['Float']>;
  special_price_5?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Vehicle_Variance_Fields = {
  __typename?: 'vehicle_variance_fields';
  charges?: Maybe<Scalars['Float']>;
  special_price_1?: Maybe<Scalars['Float']>;
  special_price_2?: Maybe<Scalars['Float']>;
  special_price_3?: Maybe<Scalars['Float']>;
  special_price_4?: Maybe<Scalars['Float']>;
  special_price_5?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "weighbridge" */
export type Weighbridge = {
  __typename?: 'weighbridge';
  address: Scalars['String'];
  /** An array relationship */
  bills: Array<Bill>;
  /** An aggregate relationship */
  bills_aggregate: Bill_Aggregate;
  created_at: Scalars['timestamptz'];
  display_name: Scalars['String'];
  id: Scalars['uuid'];
  logo?: Maybe<Scalars['String']>;
  mail: Scalars['String'];
  metadata: Scalars['json'];
  name: Scalars['String'];
  phone: Scalars['String'];
  pin_code: Scalars['String'];
  /** An object relationship */
  tenent: Tenents;
  tenent_id: Scalars['uuid'];
  updated_at: Scalars['timestamptz'];
  /** An array relationship */
  users: Array<User>;
  /** An aggregate relationship */
  users_aggregate: User_Aggregate;
};


/** columns and relationships of "weighbridge" */
export type WeighbridgeBillsArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "weighbridge" */
export type WeighbridgeBills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "weighbridge" */
export type WeighbridgeMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "weighbridge" */
export type WeighbridgeUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


/** columns and relationships of "weighbridge" */
export type WeighbridgeUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** aggregated selection of "weighbridge" */
export type Weighbridge_Aggregate = {
  __typename?: 'weighbridge_aggregate';
  aggregate?: Maybe<Weighbridge_Aggregate_Fields>;
  nodes: Array<Weighbridge>;
};

/** aggregate fields of "weighbridge" */
export type Weighbridge_Aggregate_Fields = {
  __typename?: 'weighbridge_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Weighbridge_Max_Fields>;
  min?: Maybe<Weighbridge_Min_Fields>;
};


/** aggregate fields of "weighbridge" */
export type Weighbridge_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Weighbridge_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "weighbridge" */
export type Weighbridge_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Weighbridge_Max_Order_By>;
  min?: InputMaybe<Weighbridge_Min_Order_By>;
};

/** input type for inserting array relation for remote table "weighbridge" */
export type Weighbridge_Arr_Rel_Insert_Input = {
  data: Array<Weighbridge_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Weighbridge_On_Conflict>;
};

/** Boolean expression to filter rows from the table "weighbridge". All fields are combined with a logical 'AND'. */
export type Weighbridge_Bool_Exp = {
  _and?: InputMaybe<Array<Weighbridge_Bool_Exp>>;
  _not?: InputMaybe<Weighbridge_Bool_Exp>;
  _or?: InputMaybe<Array<Weighbridge_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  bills?: InputMaybe<Bill_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  logo?: InputMaybe<String_Comparison_Exp>;
  mail?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  pin_code?: InputMaybe<String_Comparison_Exp>;
  tenent?: InputMaybe<Tenents_Bool_Exp>;
  tenent_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  users?: InputMaybe<User_Bool_Exp>;
};

/** unique or primary key constraints on table "weighbridge" */
export enum Weighbridge_Constraint {
  /** unique or primary key constraint */
  WeighbridgePkey = 'weighbridge_pkey'
}

/** input type for inserting data into table "weighbridge" */
export type Weighbridge_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  bills?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  logo?: InputMaybe<Scalars['String']>;
  mail?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  pin_code?: InputMaybe<Scalars['String']>;
  tenent?: InputMaybe<Tenents_Obj_Rel_Insert_Input>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  users?: InputMaybe<User_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Weighbridge_Max_Fields = {
  __typename?: 'weighbridge_max_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  logo?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  pin_code?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "weighbridge" */
export type Weighbridge_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  mail?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  pin_code?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Weighbridge_Min_Fields = {
  __typename?: 'weighbridge_min_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  logo?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  pin_code?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "weighbridge" */
export type Weighbridge_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  mail?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  pin_code?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "weighbridge" */
export type Weighbridge_Mutation_Response = {
  __typename?: 'weighbridge_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Weighbridge>;
};

/** input type for inserting object relation for remote table "weighbridge" */
export type Weighbridge_Obj_Rel_Insert_Input = {
  data: Weighbridge_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Weighbridge_On_Conflict>;
};

/** on_conflict condition type for table "weighbridge" */
export type Weighbridge_On_Conflict = {
  constraint: Weighbridge_Constraint;
  update_columns?: Array<Weighbridge_Update_Column>;
  where?: InputMaybe<Weighbridge_Bool_Exp>;
};

/** Ordering options when selecting data from "weighbridge". */
export type Weighbridge_Order_By = {
  address?: InputMaybe<Order_By>;
  bills_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  mail?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  pin_code?: InputMaybe<Order_By>;
  tenent?: InputMaybe<Tenents_Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<User_Aggregate_Order_By>;
};

/** primary key columns input for table: weighbridge */
export type Weighbridge_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "weighbridge" */
export enum Weighbridge_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  Logo = 'logo',
  /** column name */
  Mail = 'mail',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  PinCode = 'pin_code',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "weighbridge" */
export type Weighbridge_Set_Input = {
  address?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  logo?: InputMaybe<Scalars['String']>;
  mail?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  pin_code?: InputMaybe<Scalars['String']>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "weighbridge" */
export enum Weighbridge_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  Logo = 'logo',
  /** column name */
  Mail = 'mail',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Name = 'name',
  /** column name */
  Phone = 'phone',
  /** column name */
  PinCode = 'pin_code',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type AddTenentMutationVariables = Exact<{
  object: Tenents_Insert_Input;
}>;


export type AddTenentMutation = { __typename?: 'mutation_root', insert_tenents_one?: { __typename?: 'tenents', id: any } | null };

export type GetAllTenentsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetAllTenentsSubscription = { __typename?: 'subscription_root', tenents: Array<{ __typename?: 'tenents', email: string, name: string, activate: boolean, id: any, phone: string, metadata: any, payment_pending: boolean }> };

export type GetAllTenentsDropDownSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetAllTenentsDropDownSubscription = { __typename?: 'subscription_root', tenents: Array<{ __typename?: 'tenents', label: string, value: any }> };

export type EditTenentMutationVariables = Exact<{
  pkColumns: Tenents_Pk_Columns_Input;
  set?: InputMaybe<Tenents_Set_Input>;
}>;


export type EditTenentMutation = { __typename?: 'mutation_root', update_tenents_by_pk?: { __typename?: 'tenents', id: any } | null };

export type GetTenetQueryVariables = Exact<{
  tenentsByPkId: Scalars['uuid'];
}>;


export type GetTenetQuery = { __typename?: 'query_root', tenents_by_pk?: { __typename?: 'tenents', email: string, id: any, activate: boolean, name: string, metadata: any, phone: string, payment_pending: boolean } | null };

export type AddBillMutationVariables = Exact<{
  object: Bill_Insert_Input;
}>;


export type AddBillMutation = { __typename?: 'mutation_root', insert_bill_one?: { __typename?: 'bill', id: any, vehicle_number: string, created_at: any, charges: any, scale_weight: number, photos?: any | null, second_weight: boolean, tare_weight: number, reference_bill_id?: any | null, paid_by: string, vehicle: { __typename?: 'vehicle', name: string, id: any }, customer?: { __typename?: 'customer', id: any, name: string } | null, material: { __typename?: 'material', name: string, id: any }, weighbridge: { __typename?: 'weighbridge', display_name: string, id: any, address: string, pin_code: string, phone: string, logo?: string | null } } | null };

export type GetTareWeightBillsQueryVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Bill_Order_By> | Bill_Order_By>;
}>;


export type GetTareWeightBillsQuery = { __typename?: 'query_root', bill: Array<{ __typename?: 'bill', id: any, scale_weight: number, created_at: any }> };

export type GetTotalCollectionQueryVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
}>;


export type GetTotalCollectionQuery = { __typename?: 'query_root', bill_aggregate: { __typename?: 'bill_aggregate', aggregate?: { __typename?: 'bill_aggregate_fields', sum?: { __typename?: 'bill_sum_fields', charges?: any | null } | null } | null } };

export type GetTotalBillsSubscriptionVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Bill_Order_By> | Bill_Order_By>;
  distinctOn?: InputMaybe<Array<Bill_Select_Column> | Bill_Select_Column>;
}>;


export type GetTotalBillsSubscription = { __typename?: 'subscription_root', bill_aggregate: { __typename?: 'bill_aggregate', aggregate?: { __typename?: 'bill_aggregate_fields', count: number } | null } };

export type GetAllBillsSubscriptionVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Bill_Order_By> | Bill_Order_By>;
  distinctOn?: InputMaybe<Array<Bill_Select_Column> | Bill_Select_Column>;
}>;


export type GetAllBillsSubscription = { __typename?: 'subscription_root', bill: Array<{ __typename?: 'bill', id: any, vehicle_number: string, charges: any, created_at: any, paid_by: string, second_weight: boolean, scale_weight: number, tare_weight: number, weighbridge: { __typename?: 'weighbridge', name: string, id: any }, vehicle: { __typename?: 'vehicle', name: string }, customer?: { __typename?: 'customer', id: any, name: string } | null, customer_3?: { __typename?: 'customer', id: any, name: string } | null, customer_2?: { __typename?: 'customer', id: any, name: string } | null, material: { __typename?: 'material', name: string } }> };

export type GetBillForReceptQueryVariables = Exact<{
  billByPkId: Scalars['uuid'];
}>;


export type GetBillForReceptQuery = { __typename?: 'query_root', bill_by_pk?: { __typename?: 'bill', id: any, vehicle_number: string, created_at: any, charges: any, scale_weight: number, photos?: any | null, nano_id: number, second_weight: boolean, tare_weight: number, reference_bill_id?: any | null, paid_by: string, vehicle: { __typename?: 'vehicle', name: string, id: any }, customer?: { __typename?: 'customer', id: any, name: string } | null, material: { __typename?: 'material', name: string, id: any }, weighbridge: { __typename?: 'weighbridge', display_name: string, id: any, address: string, pin_code: string, phone: string, logo?: string | null } } | null };

export type GetVehicleByCollectionsQueryVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
}>;


export type GetVehicleByCollectionsQuery = { __typename?: 'query_root', vehicle_aggregate: { __typename?: 'vehicle_aggregate', nodes: Array<{ __typename?: 'vehicle', id: any, name: string, bills_aggregate: { __typename?: 'bill_aggregate', aggregate?: { __typename?: 'bill_aggregate_fields', sum?: { __typename?: 'bill_sum_fields', charges?: any | null } | null } | null } }> } };

export type BillsByCustomerQueryVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
}>;


export type BillsByCustomerQuery = { __typename?: 'query_root', customer_aggregate: { __typename?: 'customer_aggregate', nodes: Array<{ __typename?: 'customer', id: any, name: string, bills_id_aggregate: { __typename?: 'bill_aggregate', aggregate?: { __typename?: 'bill_aggregate_fields', sum?: { __typename?: 'bill_sum_fields', charges?: any | null } | null } | null } }> } };

export type GetCustomerDropdownOptionsQueryVariables = Exact<{
  where?: InputMaybe<Customer_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetCustomerDropdownOptionsQuery = { __typename?: 'query_root', customer: Array<{ __typename?: 'customer', value: any, label: string }> };

export type GetCustomersSubscriptionVariables = Exact<{
  where?: InputMaybe<Customer_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Customer_Order_By> | Customer_Order_By>;
}>;


export type GetCustomersSubscription = { __typename?: 'subscription_root', customer: Array<{ __typename?: 'customer', company_name: string, id: any, company_address: string, name: string, email: string, phone: string, created_at: any, credit?: boolean | null, credit_limit?: any | null, blocked: boolean }> };

export type GetCustomersCountSubscriptionVariables = Exact<{
  where?: InputMaybe<Customer_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Customer_Order_By> | Customer_Order_By>;
}>;


export type GetCustomersCountSubscription = { __typename?: 'subscription_root', customer_aggregate: { __typename?: 'customer_aggregate', aggregate?: { __typename?: 'customer_aggregate_fields', count: number } | null } };

export type DeleteCustomerMutationVariables = Exact<{
  deleteCustomerByPkId: Scalars['uuid'];
}>;


export type DeleteCustomerMutation = { __typename?: 'mutation_root', delete_customer_by_pk?: { __typename?: 'customer', id: any } | null };

export type CreateCustomerMutationVariables = Exact<{
  object: Customer_Insert_Input;
}>;


export type CreateCustomerMutation = { __typename?: 'mutation_root', insert_customer_one?: { __typename?: 'customer', id: any } | null };

export type GetCustomerQueryVariables = Exact<{
  customerByPkId: Scalars['uuid'];
}>;


export type GetCustomerQuery = { __typename?: 'query_root', customer_by_pk?: { __typename?: 'customer', company_name: string, id: any, company_address: string, name: string, email: string, phone: string, created_at: any, credit?: boolean | null, credit_limit?: any | null, gst_in?: string | null } | null };

export type UpdateClientMutationVariables = Exact<{
  pkColumns: Customer_Pk_Columns_Input;
  set?: InputMaybe<Customer_Set_Input>;
}>;


export type UpdateClientMutation = { __typename?: 'mutation_root', update_customer_by_pk?: { __typename?: 'customer', id: any } | null };

export type GetMaterialDropDownListQueryVariables = Exact<{
  where?: InputMaybe<Material_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetMaterialDropDownListQuery = { __typename?: 'query_root', material: Array<{ __typename?: 'material', value: any, label: string }> };

export type GetUserQueryVariables = Exact<{
  where?: InputMaybe<User_Bool_Exp>;
}>;


export type GetUserQuery = { __typename?: 'query_root', user: Array<{ __typename?: 'user', email: string, password: string, id: any, profile?: any | null, weighbridge_id: any, updated_at: any, role?: string | null, weighbridge: { __typename?: 'weighbridge', name: string, address: string } }> };

export type GetAllUsersSubscriptionVariables = Exact<{
  where?: InputMaybe<User_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<User_Order_By> | User_Order_By>;
}>;


export type GetAllUsersSubscription = { __typename?: 'subscription_root', user: Array<{ __typename?: 'user', id: any, email: string, synced?: boolean | null, created_at: any, tenent: { __typename?: 'tenents', name: string }, weighbridge: { __typename?: 'weighbridge', name: string } }> };

export type GetAllUsersCountSubscriptionVariables = Exact<{
  where?: InputMaybe<User_Bool_Exp>;
}>;


export type GetAllUsersCountSubscription = { __typename?: 'subscription_root', user_aggregate: { __typename?: 'user_aggregate', aggregate?: { __typename?: 'user_aggregate_fields', count: number } | null } };

export type AddUsersMutationVariables = Exact<{
  objects: Array<User_Insert_Input> | User_Insert_Input;
}>;


export type AddUsersMutation = { __typename?: 'mutation_root', insert_user?: { __typename?: 'user_mutation_response', affected_rows: number } | null };

export type DeleteUserMutationVariables = Exact<{
  deleteUserByPkId: Scalars['uuid'];
}>;


export type DeleteUserMutation = { __typename?: 'mutation_root', delete_user_by_pk?: { __typename?: 'user', id: any } | null };

export type UpdateUserMutationVariables = Exact<{
  where: User_Bool_Exp;
  set?: InputMaybe<User_Set_Input>;
}>;


export type UpdateUserMutation = { __typename?: 'mutation_root', update_user?: { __typename?: 'user_mutation_response', returning: Array<{ __typename?: 'user', id: any }> } | null };

export type GetVehiclesDropDownListQueryVariables = Exact<{
  where?: InputMaybe<Vehicle_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetVehiclesDropDownListQuery = { __typename?: 'query_root', vehicle: Array<{ __typename?: 'vehicle', value: any, label: string }> };

export type GetWeighbridgesQueryVariables = Exact<{
  where?: InputMaybe<Weighbridge_Bool_Exp>;
}>;


export type GetWeighbridgesQuery = { __typename?: 'query_root', weighbridge: Array<{ __typename?: 'weighbridge', display_name: string, id: any, address: string, created_at: any, name: string, metadata: any, phone: string, pin_code: string, mail: string, logo?: string | null }> };

export type GetWeighbridgesDropDownQueryVariables = Exact<{
  where?: InputMaybe<Weighbridge_Bool_Exp>;
}>;


export type GetWeighbridgesDropDownQuery = { __typename?: 'query_root', weighbridge: Array<{ __typename?: 'weighbridge', tenent_id: any, label: string, value: any }> };

export type DeleteWeighbridgeMutationVariables = Exact<{
  where: Weighbridge_Bool_Exp;
}>;


export type DeleteWeighbridgeMutation = { __typename?: 'mutation_root', delete_weighbridge?: { __typename?: 'weighbridge_mutation_response', returning: Array<{ __typename?: 'weighbridge', id: any }> } | null };

export type SubscribeWeighbridgeAdminSubscriptionVariables = Exact<{
  where?: InputMaybe<Weighbridge_Bool_Exp>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Weighbridge_Order_By> | Weighbridge_Order_By>;
}>;


export type SubscribeWeighbridgeAdminSubscription = { __typename?: 'subscription_root', weighbridge: Array<{ __typename?: 'weighbridge', display_name: string, id: any, address: string, created_at: any, name: string, metadata: any, phone: string, pin_code: string, mail: string, logo?: string | null, tenent: { __typename?: 'tenents', id: any, name: string } }> };

export type WeighbridgesCountSubscriptionVariables = Exact<{
  where?: InputMaybe<Weighbridge_Bool_Exp>;
}>;


export type WeighbridgesCountSubscription = { __typename?: 'subscription_root', weighbridge_aggregate: { __typename?: 'weighbridge_aggregate', aggregate?: { __typename?: 'weighbridge_aggregate_fields', count: number } | null } };

export type GetAllWeighbridgeQueryVariables = Exact<{
  where?: InputMaybe<Weighbridge_Bool_Exp>;
}>;


export type GetAllWeighbridgeQuery = { __typename?: 'query_root', weighbridge: Array<{ __typename?: 'weighbridge', display_name: string, id: any, address: string, created_at: any, name: string, metadata: any, phone: string, pin_code: string, mail: string, logo?: string | null }> };

export type GetAllWeighbridgeRealtimeSubscriptionVariables = Exact<{
  where?: InputMaybe<Weighbridge_Bool_Exp>;
}>;


export type GetAllWeighbridgeRealtimeSubscription = { __typename?: 'subscription_root', weighbridge: Array<{ __typename?: 'weighbridge', display_name: string, id: any, address: string, created_at: any, name: string, metadata: any, phone: string, pin_code: string, mail: string, logo?: string | null }> };

export type AddNewWeighbridgeMutationVariables = Exact<{
  object: Weighbridge_Insert_Input;
}>;


export type AddNewWeighbridgeMutation = { __typename?: 'mutation_root', insert_weighbridge_one?: { __typename?: 'weighbridge', id: any } | null };

export type GetWeighbridgeQueryVariables = Exact<{
  where?: InputMaybe<Weighbridge_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetWeighbridgeQuery = { __typename?: 'query_root', weighbridge: Array<{ __typename?: 'weighbridge', display_name: string, id: any, address: string, created_at: any, name: string, metadata: any, phone: string, pin_code: string, mail: string, logo?: string | null }> };

export type UpdateWeighBridgeMutationVariables = Exact<{
  pkColumns: Weighbridge_Pk_Columns_Input;
  _set?: InputMaybe<Weighbridge_Set_Input>;
}>;


export type UpdateWeighBridgeMutation = { __typename?: 'mutation_root', update_weighbridge_by_pk?: { __typename?: 'weighbridge', id: any } | null };


export const AddTenentDocument = gql`
    mutation addTenent($object: tenents_insert_input!) {
  insert_tenents_one(object: $object) {
    id
  }
}
    `;
export type AddTenentMutationFn = Apollo.MutationFunction<AddTenentMutation, AddTenentMutationVariables>;

/**
 * __useAddTenentMutation__
 *
 * To run a mutation, you first call `useAddTenentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTenentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTenentMutation, { data, loading, error }] = useAddTenentMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useAddTenentMutation(baseOptions?: Apollo.MutationHookOptions<AddTenentMutation, AddTenentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTenentMutation, AddTenentMutationVariables>(AddTenentDocument, options);
      }
export type AddTenentMutationHookResult = ReturnType<typeof useAddTenentMutation>;
export type AddTenentMutationResult = Apollo.MutationResult<AddTenentMutation>;
export type AddTenentMutationOptions = Apollo.BaseMutationOptions<AddTenentMutation, AddTenentMutationVariables>;
export const GetAllTenentsDocument = gql`
    subscription getAllTenents {
  tenents {
    email
    name
    activate
    id
    phone
    metadata
    payment_pending
  }
}
    `;

/**
 * __useGetAllTenentsSubscription__
 *
 * To run a query within a React component, call `useGetAllTenentsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTenentsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTenentsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTenentsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetAllTenentsSubscription, GetAllTenentsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetAllTenentsSubscription, GetAllTenentsSubscriptionVariables>(GetAllTenentsDocument, options);
      }
export type GetAllTenentsSubscriptionHookResult = ReturnType<typeof useGetAllTenentsSubscription>;
export type GetAllTenentsSubscriptionResult = Apollo.SubscriptionResult<GetAllTenentsSubscription>;
export const GetAllTenentsDropDownDocument = gql`
    subscription getAllTenentsDropDown {
  tenents {
    label: name
    value: id
  }
}
    `;

/**
 * __useGetAllTenentsDropDownSubscription__
 *
 * To run a query within a React component, call `useGetAllTenentsDropDownSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTenentsDropDownSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTenentsDropDownSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTenentsDropDownSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetAllTenentsDropDownSubscription, GetAllTenentsDropDownSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetAllTenentsDropDownSubscription, GetAllTenentsDropDownSubscriptionVariables>(GetAllTenentsDropDownDocument, options);
      }
export type GetAllTenentsDropDownSubscriptionHookResult = ReturnType<typeof useGetAllTenentsDropDownSubscription>;
export type GetAllTenentsDropDownSubscriptionResult = Apollo.SubscriptionResult<GetAllTenentsDropDownSubscription>;
export const EditTenentDocument = gql`
    mutation editTenent($pkColumns: tenents_pk_columns_input!, $set: tenents_set_input) {
  update_tenents_by_pk(pk_columns: $pkColumns, _set: $set) {
    id
  }
}
    `;
export type EditTenentMutationFn = Apollo.MutationFunction<EditTenentMutation, EditTenentMutationVariables>;

/**
 * __useEditTenentMutation__
 *
 * To run a mutation, you first call `useEditTenentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTenentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTenentMutation, { data, loading, error }] = useEditTenentMutation({
 *   variables: {
 *      pkColumns: // value for 'pkColumns'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useEditTenentMutation(baseOptions?: Apollo.MutationHookOptions<EditTenentMutation, EditTenentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTenentMutation, EditTenentMutationVariables>(EditTenentDocument, options);
      }
export type EditTenentMutationHookResult = ReturnType<typeof useEditTenentMutation>;
export type EditTenentMutationResult = Apollo.MutationResult<EditTenentMutation>;
export type EditTenentMutationOptions = Apollo.BaseMutationOptions<EditTenentMutation, EditTenentMutationVariables>;
export const GetTenetDocument = gql`
    query getTenet($tenentsByPkId: uuid!) {
  tenents_by_pk(id: $tenentsByPkId) {
    email
    id
    activate
    name
    metadata
    phone
    payment_pending
  }
}
    `;

/**
 * __useGetTenetQuery__
 *
 * To run a query within a React component, call `useGetTenetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTenetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTenetQuery({
 *   variables: {
 *      tenentsByPkId: // value for 'tenentsByPkId'
 *   },
 * });
 */
export function useGetTenetQuery(baseOptions: Apollo.QueryHookOptions<GetTenetQuery, GetTenetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTenetQuery, GetTenetQueryVariables>(GetTenetDocument, options);
      }
export function useGetTenetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTenetQuery, GetTenetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTenetQuery, GetTenetQueryVariables>(GetTenetDocument, options);
        }
export type GetTenetQueryHookResult = ReturnType<typeof useGetTenetQuery>;
export type GetTenetLazyQueryHookResult = ReturnType<typeof useGetTenetLazyQuery>;
export type GetTenetQueryResult = Apollo.QueryResult<GetTenetQuery, GetTenetQueryVariables>;
export const AddBillDocument = gql`
    mutation addBill($object: bill_insert_input!) {
  insert_bill_one(object: $object) {
    id
    vehicle_number
    created_at
    charges
    scale_weight
    photos
    second_weight
    tare_weight
    reference_bill_id
    vehicle {
      name
      id
    }
    customer {
      id
      name
    }
    material {
      name
      id
    }
    paid_by
    weighbridge {
      display_name
      id
      address
      pin_code
      phone
      logo
    }
  }
}
    `;
export type AddBillMutationFn = Apollo.MutationFunction<AddBillMutation, AddBillMutationVariables>;

/**
 * __useAddBillMutation__
 *
 * To run a mutation, you first call `useAddBillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBillMutation, { data, loading, error }] = useAddBillMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useAddBillMutation(baseOptions?: Apollo.MutationHookOptions<AddBillMutation, AddBillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBillMutation, AddBillMutationVariables>(AddBillDocument, options);
      }
export type AddBillMutationHookResult = ReturnType<typeof useAddBillMutation>;
export type AddBillMutationResult = Apollo.MutationResult<AddBillMutation>;
export type AddBillMutationOptions = Apollo.BaseMutationOptions<AddBillMutation, AddBillMutationVariables>;
export const GetTareWeightBillsDocument = gql`
    query getTareWeightBills($where: bill_bool_exp, $limit: Int, $orderBy: [bill_order_by!]) {
  bill(where: $where, limit: $limit, order_by: $orderBy) {
    id
    scale_weight
    created_at
  }
}
    `;

/**
 * __useGetTareWeightBillsQuery__
 *
 * To run a query within a React component, call `useGetTareWeightBillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTareWeightBillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTareWeightBillsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetTareWeightBillsQuery(baseOptions?: Apollo.QueryHookOptions<GetTareWeightBillsQuery, GetTareWeightBillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTareWeightBillsQuery, GetTareWeightBillsQueryVariables>(GetTareWeightBillsDocument, options);
      }
export function useGetTareWeightBillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTareWeightBillsQuery, GetTareWeightBillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTareWeightBillsQuery, GetTareWeightBillsQueryVariables>(GetTareWeightBillsDocument, options);
        }
export type GetTareWeightBillsQueryHookResult = ReturnType<typeof useGetTareWeightBillsQuery>;
export type GetTareWeightBillsLazyQueryHookResult = ReturnType<typeof useGetTareWeightBillsLazyQuery>;
export type GetTareWeightBillsQueryResult = Apollo.QueryResult<GetTareWeightBillsQuery, GetTareWeightBillsQueryVariables>;
export const GetTotalCollectionDocument = gql`
    query getTotalCollection($where: bill_bool_exp) {
  bill_aggregate(where: $where) {
    aggregate {
      sum {
        charges
      }
    }
  }
}
    `;

/**
 * __useGetTotalCollectionQuery__
 *
 * To run a query within a React component, call `useGetTotalCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalCollectionQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetTotalCollectionQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalCollectionQuery, GetTotalCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalCollectionQuery, GetTotalCollectionQueryVariables>(GetTotalCollectionDocument, options);
      }
export function useGetTotalCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalCollectionQuery, GetTotalCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalCollectionQuery, GetTotalCollectionQueryVariables>(GetTotalCollectionDocument, options);
        }
export type GetTotalCollectionQueryHookResult = ReturnType<typeof useGetTotalCollectionQuery>;
export type GetTotalCollectionLazyQueryHookResult = ReturnType<typeof useGetTotalCollectionLazyQuery>;
export type GetTotalCollectionQueryResult = Apollo.QueryResult<GetTotalCollectionQuery, GetTotalCollectionQueryVariables>;
export const GetTotalBillsDocument = gql`
    subscription getTotalBills($where: bill_bool_exp, $limit: Int, $offset: Int, $orderBy: [bill_order_by!], $distinctOn: [bill_select_column!]) {
  bill_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetTotalBillsSubscription__
 *
 * To run a query within a React component, call `useGetTotalBillsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalBillsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalBillsSubscription({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      distinctOn: // value for 'distinctOn'
 *   },
 * });
 */
export function useGetTotalBillsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetTotalBillsSubscription, GetTotalBillsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetTotalBillsSubscription, GetTotalBillsSubscriptionVariables>(GetTotalBillsDocument, options);
      }
export type GetTotalBillsSubscriptionHookResult = ReturnType<typeof useGetTotalBillsSubscription>;
export type GetTotalBillsSubscriptionResult = Apollo.SubscriptionResult<GetTotalBillsSubscription>;
export const GetAllBillsDocument = gql`
    subscription getAllBills($where: bill_bool_exp, $limit: Int, $offset: Int, $orderBy: [bill_order_by!], $distinctOn: [bill_select_column!]) {
  bill(
    where: $where
    limit: $limit
    offset: $offset
    order_by: $orderBy
    distinct_on: $distinctOn
  ) {
    id
    weighbridge {
      name
      id
    }
    vehicle_number
    vehicle {
      name
    }
    charges
    customer {
      id
      name
    }
    customer_3 {
      id
      name
    }
    customer_2 {
      id
      name
    }
    created_at
    material {
      name
    }
    paid_by
    second_weight
    scale_weight
    tare_weight
  }
}
    `;

/**
 * __useGetAllBillsSubscription__
 *
 * To run a query within a React component, call `useGetAllBillsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetAllBillsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllBillsSubscription({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      distinctOn: // value for 'distinctOn'
 *   },
 * });
 */
export function useGetAllBillsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetAllBillsSubscription, GetAllBillsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetAllBillsSubscription, GetAllBillsSubscriptionVariables>(GetAllBillsDocument, options);
      }
export type GetAllBillsSubscriptionHookResult = ReturnType<typeof useGetAllBillsSubscription>;
export type GetAllBillsSubscriptionResult = Apollo.SubscriptionResult<GetAllBillsSubscription>;
export const GetBillForReceptDocument = gql`
    query getBillForRecept($billByPkId: uuid!) {
  bill_by_pk(id: $billByPkId) {
    id
    vehicle_number
    created_at
    charges
    scale_weight
    photos
    nano_id
    second_weight
    tare_weight
    reference_bill_id
    vehicle {
      name
      id
    }
    customer {
      id
      name
    }
    material {
      name
      id
    }
    paid_by
    weighbridge {
      display_name
      id
      address
      pin_code
      phone
      logo
    }
  }
}
    `;

/**
 * __useGetBillForReceptQuery__
 *
 * To run a query within a React component, call `useGetBillForReceptQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillForReceptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillForReceptQuery({
 *   variables: {
 *      billByPkId: // value for 'billByPkId'
 *   },
 * });
 */
export function useGetBillForReceptQuery(baseOptions: Apollo.QueryHookOptions<GetBillForReceptQuery, GetBillForReceptQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBillForReceptQuery, GetBillForReceptQueryVariables>(GetBillForReceptDocument, options);
      }
export function useGetBillForReceptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBillForReceptQuery, GetBillForReceptQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBillForReceptQuery, GetBillForReceptQueryVariables>(GetBillForReceptDocument, options);
        }
export type GetBillForReceptQueryHookResult = ReturnType<typeof useGetBillForReceptQuery>;
export type GetBillForReceptLazyQueryHookResult = ReturnType<typeof useGetBillForReceptLazyQuery>;
export type GetBillForReceptQueryResult = Apollo.QueryResult<GetBillForReceptQuery, GetBillForReceptQueryVariables>;
export const GetVehicleByCollectionsDocument = gql`
    query getVehicleByCollections($where: bill_bool_exp) {
  vehicle_aggregate {
    nodes {
      id
      name
    }
    nodes {
      bills_aggregate(where: $where) {
        aggregate {
          sum {
            charges
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetVehicleByCollectionsQuery__
 *
 * To run a query within a React component, call `useGetVehicleByCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVehicleByCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVehicleByCollectionsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetVehicleByCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetVehicleByCollectionsQuery, GetVehicleByCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVehicleByCollectionsQuery, GetVehicleByCollectionsQueryVariables>(GetVehicleByCollectionsDocument, options);
      }
export function useGetVehicleByCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVehicleByCollectionsQuery, GetVehicleByCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVehicleByCollectionsQuery, GetVehicleByCollectionsQueryVariables>(GetVehicleByCollectionsDocument, options);
        }
export type GetVehicleByCollectionsQueryHookResult = ReturnType<typeof useGetVehicleByCollectionsQuery>;
export type GetVehicleByCollectionsLazyQueryHookResult = ReturnType<typeof useGetVehicleByCollectionsLazyQuery>;
export type GetVehicleByCollectionsQueryResult = Apollo.QueryResult<GetVehicleByCollectionsQuery, GetVehicleByCollectionsQueryVariables>;
export const BillsByCustomerDocument = gql`
    query billsByCustomer($where: bill_bool_exp) {
  customer_aggregate {
    nodes {
      id
      name
    }
    nodes {
      bills_id_aggregate(where: $where) {
        aggregate {
          sum {
            charges
          }
        }
      }
    }
  }
}
    `;

/**
 * __useBillsByCustomerQuery__
 *
 * To run a query within a React component, call `useBillsByCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useBillsByCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBillsByCustomerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBillsByCustomerQuery(baseOptions?: Apollo.QueryHookOptions<BillsByCustomerQuery, BillsByCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BillsByCustomerQuery, BillsByCustomerQueryVariables>(BillsByCustomerDocument, options);
      }
export function useBillsByCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BillsByCustomerQuery, BillsByCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BillsByCustomerQuery, BillsByCustomerQueryVariables>(BillsByCustomerDocument, options);
        }
export type BillsByCustomerQueryHookResult = ReturnType<typeof useBillsByCustomerQuery>;
export type BillsByCustomerLazyQueryHookResult = ReturnType<typeof useBillsByCustomerLazyQuery>;
export type BillsByCustomerQueryResult = Apollo.QueryResult<BillsByCustomerQuery, BillsByCustomerQueryVariables>;
export const GetCustomerDropdownOptionsDocument = gql`
    query getCustomerDropdownOptions($where: customer_bool_exp, $limit: Int) {
  customer(where: $where, limit: $limit) {
    value: id
    label: name
  }
}
    `;

/**
 * __useGetCustomerDropdownOptionsQuery__
 *
 * To run a query within a React component, call `useGetCustomerDropdownOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerDropdownOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerDropdownOptionsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetCustomerDropdownOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerDropdownOptionsQuery, GetCustomerDropdownOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerDropdownOptionsQuery, GetCustomerDropdownOptionsQueryVariables>(GetCustomerDropdownOptionsDocument, options);
      }
export function useGetCustomerDropdownOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerDropdownOptionsQuery, GetCustomerDropdownOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerDropdownOptionsQuery, GetCustomerDropdownOptionsQueryVariables>(GetCustomerDropdownOptionsDocument, options);
        }
export type GetCustomerDropdownOptionsQueryHookResult = ReturnType<typeof useGetCustomerDropdownOptionsQuery>;
export type GetCustomerDropdownOptionsLazyQueryHookResult = ReturnType<typeof useGetCustomerDropdownOptionsLazyQuery>;
export type GetCustomerDropdownOptionsQueryResult = Apollo.QueryResult<GetCustomerDropdownOptionsQuery, GetCustomerDropdownOptionsQueryVariables>;
export const GetCustomersDocument = gql`
    subscription getCustomers($where: customer_bool_exp, $limit: Int, $offset: Int, $orderBy: [customer_order_by!]) {
  customer(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
    company_name
    id
    company_address
    name
    email
    phone
    created_at
    credit
    credit_limit
    blocked
  }
}
    `;

/**
 * __useGetCustomersSubscription__
 *
 * To run a query within a React component, call `useGetCustomersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersSubscription({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetCustomersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetCustomersSubscription, GetCustomersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetCustomersSubscription, GetCustomersSubscriptionVariables>(GetCustomersDocument, options);
      }
export type GetCustomersSubscriptionHookResult = ReturnType<typeof useGetCustomersSubscription>;
export type GetCustomersSubscriptionResult = Apollo.SubscriptionResult<GetCustomersSubscription>;
export const GetCustomersCountDocument = gql`
    subscription getCustomersCount($where: customer_bool_exp, $limit: Int, $offset: Int, $orderBy: [customer_order_by!]) {
  customer_aggregate(
    where: $where
    limit: $limit
    offset: $offset
    order_by: $orderBy
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetCustomersCountSubscription__
 *
 * To run a query within a React component, call `useGetCustomersCountSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersCountSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersCountSubscription({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetCustomersCountSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetCustomersCountSubscription, GetCustomersCountSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetCustomersCountSubscription, GetCustomersCountSubscriptionVariables>(GetCustomersCountDocument, options);
      }
export type GetCustomersCountSubscriptionHookResult = ReturnType<typeof useGetCustomersCountSubscription>;
export type GetCustomersCountSubscriptionResult = Apollo.SubscriptionResult<GetCustomersCountSubscription>;
export const DeleteCustomerDocument = gql`
    mutation deleteCustomer($deleteCustomerByPkId: uuid!) {
  delete_customer_by_pk(id: $deleteCustomerByPkId) {
    id
  }
}
    `;
export type DeleteCustomerMutationFn = Apollo.MutationFunction<DeleteCustomerMutation, DeleteCustomerMutationVariables>;

/**
 * __useDeleteCustomerMutation__
 *
 * To run a mutation, you first call `useDeleteCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCustomerMutation, { data, loading, error }] = useDeleteCustomerMutation({
 *   variables: {
 *      deleteCustomerByPkId: // value for 'deleteCustomerByPkId'
 *   },
 * });
 */
export function useDeleteCustomerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DeleteCustomerDocument, options);
      }
export type DeleteCustomerMutationHookResult = ReturnType<typeof useDeleteCustomerMutation>;
export type DeleteCustomerMutationResult = Apollo.MutationResult<DeleteCustomerMutation>;
export type DeleteCustomerMutationOptions = Apollo.BaseMutationOptions<DeleteCustomerMutation, DeleteCustomerMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation createCustomer($object: customer_insert_input!) {
  insert_customer_one(object: $object) {
    id
  }
}
    `;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const GetCustomerDocument = gql`
    query getCustomer($customerByPkId: uuid!) {
  customer_by_pk(id: $customerByPkId) {
    company_name
    id
    company_address
    name
    email
    phone
    created_at
    credit
    credit_limit
    gst_in
  }
}
    `;

/**
 * __useGetCustomerQuery__
 *
 * To run a query within a React component, call `useGetCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerQuery({
 *   variables: {
 *      customerByPkId: // value for 'customerByPkId'
 *   },
 * });
 */
export function useGetCustomerQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
      }
export function useGetCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerQuery, GetCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerQuery, GetCustomerQueryVariables>(GetCustomerDocument, options);
        }
export type GetCustomerQueryHookResult = ReturnType<typeof useGetCustomerQuery>;
export type GetCustomerLazyQueryHookResult = ReturnType<typeof useGetCustomerLazyQuery>;
export type GetCustomerQueryResult = Apollo.QueryResult<GetCustomerQuery, GetCustomerQueryVariables>;
export const UpdateClientDocument = gql`
    mutation updateClient($pkColumns: customer_pk_columns_input!, $set: customer_set_input) {
  update_customer_by_pk(pk_columns: $pkColumns, _set: $set) {
    id
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      pkColumns: // value for 'pkColumns'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const GetMaterialDropDownListDocument = gql`
    query getMaterialDropDownList($where: material_bool_exp, $limit: Int, $offset: Int) {
  material(where: $where, limit: $limit, offset: $offset) {
    value: id
    label: name
  }
}
    `;

/**
 * __useGetMaterialDropDownListQuery__
 *
 * To run a query within a React component, call `useGetMaterialDropDownListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaterialDropDownListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaterialDropDownListQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMaterialDropDownListQuery(baseOptions?: Apollo.QueryHookOptions<GetMaterialDropDownListQuery, GetMaterialDropDownListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaterialDropDownListQuery, GetMaterialDropDownListQueryVariables>(GetMaterialDropDownListDocument, options);
      }
export function useGetMaterialDropDownListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaterialDropDownListQuery, GetMaterialDropDownListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaterialDropDownListQuery, GetMaterialDropDownListQueryVariables>(GetMaterialDropDownListDocument, options);
        }
export type GetMaterialDropDownListQueryHookResult = ReturnType<typeof useGetMaterialDropDownListQuery>;
export type GetMaterialDropDownListLazyQueryHookResult = ReturnType<typeof useGetMaterialDropDownListLazyQuery>;
export type GetMaterialDropDownListQueryResult = Apollo.QueryResult<GetMaterialDropDownListQuery, GetMaterialDropDownListQueryVariables>;
export const GetUserDocument = gql`
    query getUser($where: user_bool_exp) {
  user(where: $where) {
    email
    password
    id
    profile
    weighbridge_id
    weighbridge {
      name
      address
    }
    updated_at
    role
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetAllUsersDocument = gql`
    subscription getAllUsers($where: user_bool_exp, $limit: Int, $offset: Int, $orderBy: [user_order_by!]) {
  user(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
    id
    email
    tenent {
      name
    }
    synced
    created_at
    weighbridge {
      name
    }
  }
}
    `;

/**
 * __useGetAllUsersSubscription__
 *
 * To run a query within a React component, call `useGetAllUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersSubscription({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetAllUsersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetAllUsersSubscription, GetAllUsersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetAllUsersSubscription, GetAllUsersSubscriptionVariables>(GetAllUsersDocument, options);
      }
export type GetAllUsersSubscriptionHookResult = ReturnType<typeof useGetAllUsersSubscription>;
export type GetAllUsersSubscriptionResult = Apollo.SubscriptionResult<GetAllUsersSubscription>;
export const GetAllUsersCountDocument = gql`
    subscription getAllUsersCount($where: user_bool_exp) {
  user_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetAllUsersCountSubscription__
 *
 * To run a query within a React component, call `useGetAllUsersCountSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersCountSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersCountSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetAllUsersCountSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetAllUsersCountSubscription, GetAllUsersCountSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetAllUsersCountSubscription, GetAllUsersCountSubscriptionVariables>(GetAllUsersCountDocument, options);
      }
export type GetAllUsersCountSubscriptionHookResult = ReturnType<typeof useGetAllUsersCountSubscription>;
export type GetAllUsersCountSubscriptionResult = Apollo.SubscriptionResult<GetAllUsersCountSubscription>;
export const AddUsersDocument = gql`
    mutation addUsers($objects: [user_insert_input!]!) {
  insert_user(objects: $objects) {
    affected_rows
  }
}
    `;
export type AddUsersMutationFn = Apollo.MutationFunction<AddUsersMutation, AddUsersMutationVariables>;

/**
 * __useAddUsersMutation__
 *
 * To run a mutation, you first call `useAddUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersMutation, { data, loading, error }] = useAddUsersMutation({
 *   variables: {
 *      objects: // value for 'objects'
 *   },
 * });
 */
export function useAddUsersMutation(baseOptions?: Apollo.MutationHookOptions<AddUsersMutation, AddUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUsersMutation, AddUsersMutationVariables>(AddUsersDocument, options);
      }
export type AddUsersMutationHookResult = ReturnType<typeof useAddUsersMutation>;
export type AddUsersMutationResult = Apollo.MutationResult<AddUsersMutation>;
export type AddUsersMutationOptions = Apollo.BaseMutationOptions<AddUsersMutation, AddUsersMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($deleteUserByPkId: uuid!) {
  delete_user_by_pk(id: $deleteUserByPkId) {
    id
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserByPkId: // value for 'deleteUserByPkId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($where: user_bool_exp!, $set: user_set_input) {
  update_user(where: $where, _set: $set) {
    returning {
      id
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetVehiclesDropDownListDocument = gql`
    query getVehiclesDropDownList($where: vehicle_bool_exp, $limit: Int) {
  vehicle(where: $where, limit: $limit) {
    value: id
    label: name
  }
}
    `;

/**
 * __useGetVehiclesDropDownListQuery__
 *
 * To run a query within a React component, call `useGetVehiclesDropDownListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVehiclesDropDownListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVehiclesDropDownListQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetVehiclesDropDownListQuery(baseOptions?: Apollo.QueryHookOptions<GetVehiclesDropDownListQuery, GetVehiclesDropDownListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVehiclesDropDownListQuery, GetVehiclesDropDownListQueryVariables>(GetVehiclesDropDownListDocument, options);
      }
export function useGetVehiclesDropDownListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVehiclesDropDownListQuery, GetVehiclesDropDownListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVehiclesDropDownListQuery, GetVehiclesDropDownListQueryVariables>(GetVehiclesDropDownListDocument, options);
        }
export type GetVehiclesDropDownListQueryHookResult = ReturnType<typeof useGetVehiclesDropDownListQuery>;
export type GetVehiclesDropDownListLazyQueryHookResult = ReturnType<typeof useGetVehiclesDropDownListLazyQuery>;
export type GetVehiclesDropDownListQueryResult = Apollo.QueryResult<GetVehiclesDropDownListQuery, GetVehiclesDropDownListQueryVariables>;
export const GetWeighbridgesDocument = gql`
    query getWeighbridges($where: weighbridge_bool_exp) {
  weighbridge(where: $where) {
    display_name
    id
    address
    created_at
    name
    metadata
    phone
    pin_code
    mail
    logo
    metadata
  }
}
    `;

/**
 * __useGetWeighbridgesQuery__
 *
 * To run a query within a React component, call `useGetWeighbridgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeighbridgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeighbridgesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWeighbridgesQuery(baseOptions?: Apollo.QueryHookOptions<GetWeighbridgesQuery, GetWeighbridgesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWeighbridgesQuery, GetWeighbridgesQueryVariables>(GetWeighbridgesDocument, options);
      }
export function useGetWeighbridgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeighbridgesQuery, GetWeighbridgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWeighbridgesQuery, GetWeighbridgesQueryVariables>(GetWeighbridgesDocument, options);
        }
export type GetWeighbridgesQueryHookResult = ReturnType<typeof useGetWeighbridgesQuery>;
export type GetWeighbridgesLazyQueryHookResult = ReturnType<typeof useGetWeighbridgesLazyQuery>;
export type GetWeighbridgesQueryResult = Apollo.QueryResult<GetWeighbridgesQuery, GetWeighbridgesQueryVariables>;
export const GetWeighbridgesDropDownDocument = gql`
    query getWeighbridgesDropDown($where: weighbridge_bool_exp) {
  weighbridge(where: $where) {
    label: name
    value: id
    tenent_id
  }
}
    `;

/**
 * __useGetWeighbridgesDropDownQuery__
 *
 * To run a query within a React component, call `useGetWeighbridgesDropDownQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeighbridgesDropDownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeighbridgesDropDownQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWeighbridgesDropDownQuery(baseOptions?: Apollo.QueryHookOptions<GetWeighbridgesDropDownQuery, GetWeighbridgesDropDownQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWeighbridgesDropDownQuery, GetWeighbridgesDropDownQueryVariables>(GetWeighbridgesDropDownDocument, options);
      }
export function useGetWeighbridgesDropDownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeighbridgesDropDownQuery, GetWeighbridgesDropDownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWeighbridgesDropDownQuery, GetWeighbridgesDropDownQueryVariables>(GetWeighbridgesDropDownDocument, options);
        }
export type GetWeighbridgesDropDownQueryHookResult = ReturnType<typeof useGetWeighbridgesDropDownQuery>;
export type GetWeighbridgesDropDownLazyQueryHookResult = ReturnType<typeof useGetWeighbridgesDropDownLazyQuery>;
export type GetWeighbridgesDropDownQueryResult = Apollo.QueryResult<GetWeighbridgesDropDownQuery, GetWeighbridgesDropDownQueryVariables>;
export const DeleteWeighbridgeDocument = gql`
    mutation deleteWeighbridge($where: weighbridge_bool_exp!) {
  delete_weighbridge(where: $where) {
    returning {
      id
    }
  }
}
    `;
export type DeleteWeighbridgeMutationFn = Apollo.MutationFunction<DeleteWeighbridgeMutation, DeleteWeighbridgeMutationVariables>;

/**
 * __useDeleteWeighbridgeMutation__
 *
 * To run a mutation, you first call `useDeleteWeighbridgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWeighbridgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWeighbridgeMutation, { data, loading, error }] = useDeleteWeighbridgeMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteWeighbridgeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWeighbridgeMutation, DeleteWeighbridgeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWeighbridgeMutation, DeleteWeighbridgeMutationVariables>(DeleteWeighbridgeDocument, options);
      }
export type DeleteWeighbridgeMutationHookResult = ReturnType<typeof useDeleteWeighbridgeMutation>;
export type DeleteWeighbridgeMutationResult = Apollo.MutationResult<DeleteWeighbridgeMutation>;
export type DeleteWeighbridgeMutationOptions = Apollo.BaseMutationOptions<DeleteWeighbridgeMutation, DeleteWeighbridgeMutationVariables>;
export const SubscribeWeighbridgeAdminDocument = gql`
    subscription subscribeWeighbridgeAdmin($where: weighbridge_bool_exp, $offset: Int, $limit: Int, $orderBy: [weighbridge_order_by!]) {
  weighbridge(where: $where, offset: $offset, limit: $limit, order_by: $orderBy) {
    display_name
    id
    address
    created_at
    name
    tenent {
      id
      name
    }
    metadata
    phone
    pin_code
    mail
    logo
  }
}
    `;

/**
 * __useSubscribeWeighbridgeAdminSubscription__
 *
 * To run a query within a React component, call `useSubscribeWeighbridgeAdminSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeWeighbridgeAdminSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeWeighbridgeAdminSubscription({
 *   variables: {
 *      where: // value for 'where'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSubscribeWeighbridgeAdminSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeWeighbridgeAdminSubscription, SubscribeWeighbridgeAdminSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeWeighbridgeAdminSubscription, SubscribeWeighbridgeAdminSubscriptionVariables>(SubscribeWeighbridgeAdminDocument, options);
      }
export type SubscribeWeighbridgeAdminSubscriptionHookResult = ReturnType<typeof useSubscribeWeighbridgeAdminSubscription>;
export type SubscribeWeighbridgeAdminSubscriptionResult = Apollo.SubscriptionResult<SubscribeWeighbridgeAdminSubscription>;
export const WeighbridgesCountDocument = gql`
    subscription weighbridgesCount($where: weighbridge_bool_exp) {
  weighbridge_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useWeighbridgesCountSubscription__
 *
 * To run a query within a React component, call `useWeighbridgesCountSubscription` and pass it any options that fit your needs.
 * When your component renders, `useWeighbridgesCountSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWeighbridgesCountSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useWeighbridgesCountSubscription(baseOptions?: Apollo.SubscriptionHookOptions<WeighbridgesCountSubscription, WeighbridgesCountSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<WeighbridgesCountSubscription, WeighbridgesCountSubscriptionVariables>(WeighbridgesCountDocument, options);
      }
export type WeighbridgesCountSubscriptionHookResult = ReturnType<typeof useWeighbridgesCountSubscription>;
export type WeighbridgesCountSubscriptionResult = Apollo.SubscriptionResult<WeighbridgesCountSubscription>;
export const GetAllWeighbridgeDocument = gql`
    query getAllWeighbridge($where: weighbridge_bool_exp) {
  weighbridge(where: $where) {
    display_name
    id
    address
    created_at
    name
    metadata
    phone
    pin_code
    mail
    logo
  }
}
    `;

/**
 * __useGetAllWeighbridgeQuery__
 *
 * To run a query within a React component, call `useGetAllWeighbridgeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWeighbridgeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWeighbridgeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetAllWeighbridgeQuery(baseOptions?: Apollo.QueryHookOptions<GetAllWeighbridgeQuery, GetAllWeighbridgeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllWeighbridgeQuery, GetAllWeighbridgeQueryVariables>(GetAllWeighbridgeDocument, options);
      }
export function useGetAllWeighbridgeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllWeighbridgeQuery, GetAllWeighbridgeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllWeighbridgeQuery, GetAllWeighbridgeQueryVariables>(GetAllWeighbridgeDocument, options);
        }
export type GetAllWeighbridgeQueryHookResult = ReturnType<typeof useGetAllWeighbridgeQuery>;
export type GetAllWeighbridgeLazyQueryHookResult = ReturnType<typeof useGetAllWeighbridgeLazyQuery>;
export type GetAllWeighbridgeQueryResult = Apollo.QueryResult<GetAllWeighbridgeQuery, GetAllWeighbridgeQueryVariables>;
export const GetAllWeighbridgeRealtimeDocument = gql`
    subscription getAllWeighbridgeRealtime($where: weighbridge_bool_exp) {
  weighbridge(where: $where) {
    display_name
    id
    address
    created_at
    name
    metadata
    phone
    pin_code
    mail
    logo
  }
}
    `;

/**
 * __useGetAllWeighbridgeRealtimeSubscription__
 *
 * To run a query within a React component, call `useGetAllWeighbridgeRealtimeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWeighbridgeRealtimeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWeighbridgeRealtimeSubscription({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetAllWeighbridgeRealtimeSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetAllWeighbridgeRealtimeSubscription, GetAllWeighbridgeRealtimeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetAllWeighbridgeRealtimeSubscription, GetAllWeighbridgeRealtimeSubscriptionVariables>(GetAllWeighbridgeRealtimeDocument, options);
      }
export type GetAllWeighbridgeRealtimeSubscriptionHookResult = ReturnType<typeof useGetAllWeighbridgeRealtimeSubscription>;
export type GetAllWeighbridgeRealtimeSubscriptionResult = Apollo.SubscriptionResult<GetAllWeighbridgeRealtimeSubscription>;
export const AddNewWeighbridgeDocument = gql`
    mutation addNewWeighbridge($object: weighbridge_insert_input!) {
  insert_weighbridge_one(object: $object) {
    id
  }
}
    `;
export type AddNewWeighbridgeMutationFn = Apollo.MutationFunction<AddNewWeighbridgeMutation, AddNewWeighbridgeMutationVariables>;

/**
 * __useAddNewWeighbridgeMutation__
 *
 * To run a mutation, you first call `useAddNewWeighbridgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddNewWeighbridgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addNewWeighbridgeMutation, { data, loading, error }] = useAddNewWeighbridgeMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useAddNewWeighbridgeMutation(baseOptions?: Apollo.MutationHookOptions<AddNewWeighbridgeMutation, AddNewWeighbridgeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddNewWeighbridgeMutation, AddNewWeighbridgeMutationVariables>(AddNewWeighbridgeDocument, options);
      }
export type AddNewWeighbridgeMutationHookResult = ReturnType<typeof useAddNewWeighbridgeMutation>;
export type AddNewWeighbridgeMutationResult = Apollo.MutationResult<AddNewWeighbridgeMutation>;
export type AddNewWeighbridgeMutationOptions = Apollo.BaseMutationOptions<AddNewWeighbridgeMutation, AddNewWeighbridgeMutationVariables>;
export const GetWeighbridgeDocument = gql`
    query getWeighbridge($where: weighbridge_bool_exp, $limit: Int) {
  weighbridge(where: $where, limit: $limit) {
    display_name
    id
    address
    created_at
    name
    metadata
    phone
    pin_code
    mail
    logo
  }
}
    `;

/**
 * __useGetWeighbridgeQuery__
 *
 * To run a query within a React component, call `useGetWeighbridgeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWeighbridgeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWeighbridgeQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWeighbridgeQuery(baseOptions?: Apollo.QueryHookOptions<GetWeighbridgeQuery, GetWeighbridgeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWeighbridgeQuery, GetWeighbridgeQueryVariables>(GetWeighbridgeDocument, options);
      }
export function useGetWeighbridgeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWeighbridgeQuery, GetWeighbridgeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWeighbridgeQuery, GetWeighbridgeQueryVariables>(GetWeighbridgeDocument, options);
        }
export type GetWeighbridgeQueryHookResult = ReturnType<typeof useGetWeighbridgeQuery>;
export type GetWeighbridgeLazyQueryHookResult = ReturnType<typeof useGetWeighbridgeLazyQuery>;
export type GetWeighbridgeQueryResult = Apollo.QueryResult<GetWeighbridgeQuery, GetWeighbridgeQueryVariables>;
export const UpdateWeighBridgeDocument = gql`
    mutation updateWeighBridge($pkColumns: weighbridge_pk_columns_input!, $_set: weighbridge_set_input) {
  update_weighbridge_by_pk(pk_columns: $pkColumns, _set: $_set) {
    id
  }
}
    `;
export type UpdateWeighBridgeMutationFn = Apollo.MutationFunction<UpdateWeighBridgeMutation, UpdateWeighBridgeMutationVariables>;

/**
 * __useUpdateWeighBridgeMutation__
 *
 * To run a mutation, you first call `useUpdateWeighBridgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWeighBridgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWeighBridgeMutation, { data, loading, error }] = useUpdateWeighBridgeMutation({
 *   variables: {
 *      pkColumns: // value for 'pkColumns'
 *      _set: // value for '_set'
 *   },
 * });
 */
export function useUpdateWeighBridgeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWeighBridgeMutation, UpdateWeighBridgeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWeighBridgeMutation, UpdateWeighBridgeMutationVariables>(UpdateWeighBridgeDocument, options);
      }
export type UpdateWeighBridgeMutationHookResult = ReturnType<typeof useUpdateWeighBridgeMutation>;
export type UpdateWeighBridgeMutationResult = Apollo.MutationResult<UpdateWeighBridgeMutation>;
export type UpdateWeighBridgeMutationOptions = Apollo.BaseMutationOptions<UpdateWeighBridgeMutation, UpdateWeighBridgeMutationVariables>;