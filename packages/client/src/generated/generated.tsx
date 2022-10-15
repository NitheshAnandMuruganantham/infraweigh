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

/** columns and relationships of "bill" */
export type Bill = {
  __typename?: 'bill';
  /** An object relationship */
  billByReferenceBillId?: Maybe<Bill>;
  /** An array relationship */
  billsByReferenceBillId: Array<Bill>;
  /** An aggregate relationship */
  billsByReferenceBillId_aggregate: Bill_Aggregate;
  box_number?: Maybe<Scalars['String']>;
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
  driver_phone?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An object relationship */
  material: Material;
  material_id: Scalars['uuid'];
  nano_id: Scalars['Int'];
  order_id?: Maybe<Scalars['String']>;
  paid?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  paidByByPaidBy: Paid_By;
  paid_by: Paid_By_Enum;
  payment_initiated?: Maybe<Scalars['Boolean']>;
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
  box_number?: InputMaybe<String_Comparison_Exp>;
  charges?: InputMaybe<Money_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  customer?: InputMaybe<Customer_Bool_Exp>;
  customerByCustomerId?: InputMaybe<Customer_Bool_Exp>;
  customer_2?: InputMaybe<Customer_Bool_Exp>;
  customer_2_id?: InputMaybe<Uuid_Comparison_Exp>;
  customer_3?: InputMaybe<Customer_Bool_Exp>;
  customer_3_id?: InputMaybe<Uuid_Comparison_Exp>;
  customer_id?: InputMaybe<Uuid_Comparison_Exp>;
  driver_phone?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  material?: InputMaybe<Material_Bool_Exp>;
  material_id?: InputMaybe<Uuid_Comparison_Exp>;
  nano_id?: InputMaybe<Int_Comparison_Exp>;
  order_id?: InputMaybe<String_Comparison_Exp>;
  paid?: InputMaybe<Boolean_Comparison_Exp>;
  paidByByPaidBy?: InputMaybe<Paid_By_Bool_Exp>;
  paid_by?: InputMaybe<Paid_By_Enum_Comparison_Exp>;
  payment_initiated?: InputMaybe<Boolean_Comparison_Exp>;
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
  /** unique or primary key constraint on columns "nano_id" */
  BillNanoIdKey = 'bill_nano_id_key',
  /** unique or primary key constraint on columns "id" */
  BillPkey = 'bill_pkey',
  /** unique or primary key constraint on columns "nano_id" */
  BillPkey_2 = 'bill_pkey_2'
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
  box_number?: InputMaybe<Scalars['String']>;
  charges?: InputMaybe<Scalars['money']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  customer?: InputMaybe<Customer_Obj_Rel_Insert_Input>;
  customerByCustomerId?: InputMaybe<Customer_Obj_Rel_Insert_Input>;
  customer_2?: InputMaybe<Customer_Obj_Rel_Insert_Input>;
  customer_2_id?: InputMaybe<Scalars['uuid']>;
  customer_3?: InputMaybe<Customer_Obj_Rel_Insert_Input>;
  customer_3_id?: InputMaybe<Scalars['uuid']>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  driver_phone?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  material?: InputMaybe<Material_Obj_Rel_Insert_Input>;
  material_id?: InputMaybe<Scalars['uuid']>;
  nano_id?: InputMaybe<Scalars['Int']>;
  order_id?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  paidByByPaidBy?: InputMaybe<Paid_By_Obj_Rel_Insert_Input>;
  paid_by?: InputMaybe<Paid_By_Enum>;
  payment_initiated?: InputMaybe<Scalars['Boolean']>;
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
  box_number?: Maybe<Scalars['String']>;
  charges?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  customer_2_id?: Maybe<Scalars['uuid']>;
  customer_3_id?: Maybe<Scalars['uuid']>;
  customer_id?: Maybe<Scalars['uuid']>;
  driver_phone?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  material_id?: Maybe<Scalars['uuid']>;
  nano_id?: Maybe<Scalars['Int']>;
  order_id?: Maybe<Scalars['String']>;
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
  box_number?: InputMaybe<Order_By>;
  charges?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer_2_id?: InputMaybe<Order_By>;
  customer_3_id?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  driver_phone?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
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
  box_number?: Maybe<Scalars['String']>;
  charges?: Maybe<Scalars['money']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  customer_2_id?: Maybe<Scalars['uuid']>;
  customer_3_id?: Maybe<Scalars['uuid']>;
  customer_id?: Maybe<Scalars['uuid']>;
  driver_phone?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  material_id?: Maybe<Scalars['uuid']>;
  nano_id?: Maybe<Scalars['Int']>;
  order_id?: Maybe<Scalars['String']>;
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
  box_number?: InputMaybe<Order_By>;
  charges?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer_2_id?: InputMaybe<Order_By>;
  customer_3_id?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  driver_phone?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  material_id?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
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
  box_number?: InputMaybe<Order_By>;
  charges?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  customer?: InputMaybe<Customer_Order_By>;
  customerByCustomerId?: InputMaybe<Customer_Order_By>;
  customer_2?: InputMaybe<Customer_Order_By>;
  customer_2_id?: InputMaybe<Order_By>;
  customer_3?: InputMaybe<Customer_Order_By>;
  customer_3_id?: InputMaybe<Order_By>;
  customer_id?: InputMaybe<Order_By>;
  driver_phone?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  material?: InputMaybe<Material_Order_By>;
  material_id?: InputMaybe<Order_By>;
  nano_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
  paid?: InputMaybe<Order_By>;
  paidByByPaidBy?: InputMaybe<Paid_By_Order_By>;
  paid_by?: InputMaybe<Order_By>;
  payment_initiated?: InputMaybe<Order_By>;
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
  BoxNumber = 'box_number',
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
  DriverPhone = 'driver_phone',
  /** column name */
  Id = 'id',
  /** column name */
  MaterialId = 'material_id',
  /** column name */
  NanoId = 'nano_id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Paid = 'paid',
  /** column name */
  PaidBy = 'paid_by',
  /** column name */
  PaymentInitiated = 'payment_initiated',
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
  box_number?: InputMaybe<Scalars['String']>;
  charges?: InputMaybe<Scalars['money']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  customer_2_id?: InputMaybe<Scalars['uuid']>;
  customer_3_id?: InputMaybe<Scalars['uuid']>;
  customer_id?: InputMaybe<Scalars['uuid']>;
  driver_phone?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  material_id?: InputMaybe<Scalars['uuid']>;
  nano_id?: InputMaybe<Scalars['Int']>;
  order_id?: InputMaybe<Scalars['String']>;
  paid?: InputMaybe<Scalars['Boolean']>;
  paid_by?: InputMaybe<Paid_By_Enum>;
  payment_initiated?: InputMaybe<Scalars['Boolean']>;
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
  BoxNumber = 'box_number',
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
  DriverPhone = 'driver_phone',
  /** column name */
  Id = 'id',
  /** column name */
  MaterialId = 'material_id',
  /** column name */
  NanoId = 'nano_id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Paid = 'paid',
  /** column name */
  PaidBy = 'paid_by',
  /** column name */
  PaymentInitiated = 'payment_initiated',
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
  count: Scalars['Int'];
  max?: Maybe<Customer_Max_Fields>;
  min?: Maybe<Customer_Min_Fields>;
};


/** aggregate fields of "customer" */
export type Customer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Customer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "customer" */
export type Customer_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Customer_Max_Order_By>;
  min?: InputMaybe<Customer_Min_Order_By>;
};

/** input type for inserting array relation for remote table "customer" */
export type Customer_Arr_Rel_Insert_Input = {
  data: Array<Customer_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Customer_On_Conflict>;
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
  /** unique or primary key constraint on columns "id" */
  CustomerPkey = 'customer_pkey'
}

/** input type for inserting data into table "customer" */
export type Customer_Insert_Input = {
  bills_2?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  bills_3?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  bills_id?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  blocked?: InputMaybe<Scalars['Boolean']>;
  company_address?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
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
  email?: InputMaybe<Scalars['String']>;
  gst_in?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
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

/** columns and relationships of "issues" */
export type Issues = {
  __typename?: 'issues';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  message: Scalars['String'];
  resolved?: Maybe<Scalars['Boolean']>;
  severity: Scalars['String'];
  /** An object relationship */
  severityBySeverity: Severity;
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: User;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "issues" */
export type Issues_Aggregate = {
  __typename?: 'issues_aggregate';
  aggregate?: Maybe<Issues_Aggregate_Fields>;
  nodes: Array<Issues>;
};

/** aggregate fields of "issues" */
export type Issues_Aggregate_Fields = {
  __typename?: 'issues_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Issues_Max_Fields>;
  min?: Maybe<Issues_Min_Fields>;
};


/** aggregate fields of "issues" */
export type Issues_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Issues_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "issues" */
export type Issues_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Issues_Max_Order_By>;
  min?: InputMaybe<Issues_Min_Order_By>;
};

/** input type for inserting array relation for remote table "issues" */
export type Issues_Arr_Rel_Insert_Input = {
  data: Array<Issues_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Issues_On_Conflict>;
};

/** Boolean expression to filter rows from the table "issues". All fields are combined with a logical 'AND'. */
export type Issues_Bool_Exp = {
  _and?: InputMaybe<Array<Issues_Bool_Exp>>;
  _not?: InputMaybe<Issues_Bool_Exp>;
  _or?: InputMaybe<Array<Issues_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  resolved?: InputMaybe<Boolean_Comparison_Exp>;
  severity?: InputMaybe<String_Comparison_Exp>;
  severityBySeverity?: InputMaybe<Severity_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "issues" */
export enum Issues_Constraint {
  /** unique or primary key constraint on columns "id" */
  IssuesPkey = 'issues_pkey'
}

/** input type for inserting data into table "issues" */
export type Issues_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  message?: InputMaybe<Scalars['String']>;
  resolved?: InputMaybe<Scalars['Boolean']>;
  severity?: InputMaybe<Scalars['String']>;
  severityBySeverity?: InputMaybe<Severity_Obj_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Issues_Max_Fields = {
  __typename?: 'issues_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  severity?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "issues" */
export type Issues_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Issues_Min_Fields = {
  __typename?: 'issues_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  severity?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "issues" */
export type Issues_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "issues" */
export type Issues_Mutation_Response = {
  __typename?: 'issues_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Issues>;
};

/** on_conflict condition type for table "issues" */
export type Issues_On_Conflict = {
  constraint: Issues_Constraint;
  update_columns?: Array<Issues_Update_Column>;
  where?: InputMaybe<Issues_Bool_Exp>;
};

/** Ordering options when selecting data from "issues". */
export type Issues_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  resolved?: InputMaybe<Order_By>;
  severity?: InputMaybe<Order_By>;
  severityBySeverity?: InputMaybe<Severity_Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: issues */
export type Issues_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "issues" */
export enum Issues_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Resolved = 'resolved',
  /** column name */
  Severity = 'severity',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "issues" */
export type Issues_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  message?: InputMaybe<Scalars['String']>;
  resolved?: InputMaybe<Scalars['Boolean']>;
  severity?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "issues" */
export enum Issues_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Resolved = 'resolved',
  /** column name */
  Severity = 'severity',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

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
  /** unique or primary key constraint on columns "hsn" */
  MaterialsHsnKey = 'materials_hsn_key',
  /** unique or primary key constraint on columns "id" */
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
  /** delete data from the table: "bill" */
  delete_bill?: Maybe<Bill_Mutation_Response>;
  /** delete single row from the table: "bill" */
  delete_bill_by_pk?: Maybe<Bill>;
  /** delete data from the table: "customer" */
  delete_customer?: Maybe<Customer_Mutation_Response>;
  /** delete single row from the table: "customer" */
  delete_customer_by_pk?: Maybe<Customer>;
  /** delete data from the table: "issues" */
  delete_issues?: Maybe<Issues_Mutation_Response>;
  /** delete single row from the table: "issues" */
  delete_issues_by_pk?: Maybe<Issues>;
  /** delete data from the table: "material" */
  delete_material?: Maybe<Material_Mutation_Response>;
  /** delete single row from the table: "material" */
  delete_material_by_pk?: Maybe<Material>;
  /** delete data from the table: "paid_by" */
  delete_paid_by?: Maybe<Paid_By_Mutation_Response>;
  /** delete single row from the table: "paid_by" */
  delete_paid_by_by_pk?: Maybe<Paid_By>;
  /** delete data from the table: "role" */
  delete_role?: Maybe<Role_Mutation_Response>;
  /** delete single row from the table: "role" */
  delete_role_by_pk?: Maybe<Role>;
  /** delete data from the table: "severity" */
  delete_severity?: Maybe<Severity_Mutation_Response>;
  /** delete single row from the table: "severity" */
  delete_severity_by_pk?: Maybe<Severity>;
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
  /** insert data into the table: "bill" */
  insert_bill?: Maybe<Bill_Mutation_Response>;
  /** insert a single row into the table: "bill" */
  insert_bill_one?: Maybe<Bill>;
  /** insert data into the table: "customer" */
  insert_customer?: Maybe<Customer_Mutation_Response>;
  /** insert a single row into the table: "customer" */
  insert_customer_one?: Maybe<Customer>;
  /** insert data into the table: "issues" */
  insert_issues?: Maybe<Issues_Mutation_Response>;
  /** insert a single row into the table: "issues" */
  insert_issues_one?: Maybe<Issues>;
  /** insert data into the table: "material" */
  insert_material?: Maybe<Material_Mutation_Response>;
  /** insert a single row into the table: "material" */
  insert_material_one?: Maybe<Material>;
  /** insert data into the table: "paid_by" */
  insert_paid_by?: Maybe<Paid_By_Mutation_Response>;
  /** insert a single row into the table: "paid_by" */
  insert_paid_by_one?: Maybe<Paid_By>;
  /** insert data into the table: "role" */
  insert_role?: Maybe<Role_Mutation_Response>;
  /** insert a single row into the table: "role" */
  insert_role_one?: Maybe<Role>;
  /** insert data into the table: "severity" */
  insert_severity?: Maybe<Severity_Mutation_Response>;
  /** insert a single row into the table: "severity" */
  insert_severity_one?: Maybe<Severity>;
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
  /** update data of the table: "bill" */
  update_bill?: Maybe<Bill_Mutation_Response>;
  /** update single row of the table: "bill" */
  update_bill_by_pk?: Maybe<Bill>;
  /** update data of the table: "customer" */
  update_customer?: Maybe<Customer_Mutation_Response>;
  /** update single row of the table: "customer" */
  update_customer_by_pk?: Maybe<Customer>;
  /** update data of the table: "issues" */
  update_issues?: Maybe<Issues_Mutation_Response>;
  /** update single row of the table: "issues" */
  update_issues_by_pk?: Maybe<Issues>;
  /** update data of the table: "material" */
  update_material?: Maybe<Material_Mutation_Response>;
  /** update single row of the table: "material" */
  update_material_by_pk?: Maybe<Material>;
  /** update data of the table: "paid_by" */
  update_paid_by?: Maybe<Paid_By_Mutation_Response>;
  /** update single row of the table: "paid_by" */
  update_paid_by_by_pk?: Maybe<Paid_By>;
  /** update data of the table: "role" */
  update_role?: Maybe<Role_Mutation_Response>;
  /** update single row of the table: "role" */
  update_role_by_pk?: Maybe<Role>;
  /** update data of the table: "severity" */
  update_severity?: Maybe<Severity_Mutation_Response>;
  /** update single row of the table: "severity" */
  update_severity_by_pk?: Maybe<Severity>;
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
export type Mutation_RootDelete_IssuesArgs = {
  where: Issues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Issues_By_PkArgs = {
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
export type Mutation_RootDelete_Paid_ByArgs = {
  where: Paid_By_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Paid_By_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_RoleArgs = {
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Role_By_PkArgs = {
  value: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_SeverityArgs = {
  where: Severity_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Severity_By_PkArgs = {
  name: Scalars['String'];
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
export type Mutation_RootInsert_IssuesArgs = {
  objects: Array<Issues_Insert_Input>;
  on_conflict?: InputMaybe<Issues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Issues_OneArgs = {
  object: Issues_Insert_Input;
  on_conflict?: InputMaybe<Issues_On_Conflict>;
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
export type Mutation_RootInsert_Paid_ByArgs = {
  objects: Array<Paid_By_Insert_Input>;
  on_conflict?: InputMaybe<Paid_By_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Paid_By_OneArgs = {
  object: Paid_By_Insert_Input;
  on_conflict?: InputMaybe<Paid_By_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RoleArgs = {
  objects: Array<Role_Insert_Input>;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Role_OneArgs = {
  object: Role_Insert_Input;
  on_conflict?: InputMaybe<Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SeverityArgs = {
  objects: Array<Severity_Insert_Input>;
  on_conflict?: InputMaybe<Severity_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Severity_OneArgs = {
  object: Severity_Insert_Input;
  on_conflict?: InputMaybe<Severity_On_Conflict>;
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
  _set?: InputMaybe<Customer_Set_Input>;
  where: Customer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Customer_By_PkArgs = {
  _set?: InputMaybe<Customer_Set_Input>;
  pk_columns: Customer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_IssuesArgs = {
  _set?: InputMaybe<Issues_Set_Input>;
  where: Issues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Issues_By_PkArgs = {
  _set?: InputMaybe<Issues_Set_Input>;
  pk_columns: Issues_Pk_Columns_Input;
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
export type Mutation_RootUpdate_Paid_ByArgs = {
  _set?: InputMaybe<Paid_By_Set_Input>;
  where: Paid_By_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Paid_By_By_PkArgs = {
  _set?: InputMaybe<Paid_By_Set_Input>;
  pk_columns: Paid_By_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RoleArgs = {
  _set?: InputMaybe<Role_Set_Input>;
  where: Role_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Role_By_PkArgs = {
  _set?: InputMaybe<Role_Set_Input>;
  pk_columns: Role_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SeverityArgs = {
  _set?: InputMaybe<Severity_Set_Input>;
  where: Severity_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Severity_By_PkArgs = {
  _set?: InputMaybe<Severity_Set_Input>;
  pk_columns: Severity_Pk_Columns_Input;
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
  _set?: InputMaybe<Vehicle_Set_Input>;
  where: Vehicle_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Vehicle_By_PkArgs = {
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

/** columns and relationships of "paid_by" */
export type Paid_By = {
  __typename?: 'paid_by';
  /** An array relationship */
  bills: Array<Bill>;
  /** An aggregate relationship */
  bills_aggregate: Bill_Aggregate;
  comment: Scalars['String'];
  value: Scalars['String'];
};


/** columns and relationships of "paid_by" */
export type Paid_ByBillsArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};


/** columns and relationships of "paid_by" */
export type Paid_ByBills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bill_Order_By>>;
  where?: InputMaybe<Bill_Bool_Exp>;
};

/** aggregated selection of "paid_by" */
export type Paid_By_Aggregate = {
  __typename?: 'paid_by_aggregate';
  aggregate?: Maybe<Paid_By_Aggregate_Fields>;
  nodes: Array<Paid_By>;
};

/** aggregate fields of "paid_by" */
export type Paid_By_Aggregate_Fields = {
  __typename?: 'paid_by_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Paid_By_Max_Fields>;
  min?: Maybe<Paid_By_Min_Fields>;
};


/** aggregate fields of "paid_by" */
export type Paid_By_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Paid_By_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "paid_by". All fields are combined with a logical 'AND'. */
export type Paid_By_Bool_Exp = {
  _and?: InputMaybe<Array<Paid_By_Bool_Exp>>;
  _not?: InputMaybe<Paid_By_Bool_Exp>;
  _or?: InputMaybe<Array<Paid_By_Bool_Exp>>;
  bills?: InputMaybe<Bill_Bool_Exp>;
  comment?: InputMaybe<String_Comparison_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "paid_by" */
export enum Paid_By_Constraint {
  /** unique or primary key constraint on columns "value" */
  PaidByPkey = 'paid_by_pkey'
}

export enum Paid_By_Enum {
  /** buyer */
  Buyer = 'buyer',
  /** cash */
  Cash = 'cash',
  /** driver */
  Driver = 'driver',
  /** other */
  Other = 'other',
  /** seller */
  Seller = 'seller',
  /** trader */
  Trader = 'trader'
}

/** Boolean expression to compare columns of type "paid_by_enum". All fields are combined with logical 'AND'. */
export type Paid_By_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Paid_By_Enum>;
  _in?: InputMaybe<Array<Paid_By_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Paid_By_Enum>;
  _nin?: InputMaybe<Array<Paid_By_Enum>>;
};

/** input type for inserting data into table "paid_by" */
export type Paid_By_Insert_Input = {
  bills?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Paid_By_Max_Fields = {
  __typename?: 'paid_by_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Paid_By_Min_Fields = {
  __typename?: 'paid_by_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "paid_by" */
export type Paid_By_Mutation_Response = {
  __typename?: 'paid_by_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Paid_By>;
};

/** input type for inserting object relation for remote table "paid_by" */
export type Paid_By_Obj_Rel_Insert_Input = {
  data: Paid_By_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Paid_By_On_Conflict>;
};

/** on_conflict condition type for table "paid_by" */
export type Paid_By_On_Conflict = {
  constraint: Paid_By_Constraint;
  update_columns?: Array<Paid_By_Update_Column>;
  where?: InputMaybe<Paid_By_Bool_Exp>;
};

/** Ordering options when selecting data from "paid_by". */
export type Paid_By_Order_By = {
  bills_aggregate?: InputMaybe<Bill_Aggregate_Order_By>;
  comment?: InputMaybe<Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: paid_by */
export type Paid_By_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "paid_by" */
export enum Paid_By_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "paid_by" */
export type Paid_By_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "paid_by" */
export enum Paid_By_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

export type Query_Root = {
  __typename?: 'query_root';
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
  /** An array relationship */
  issues: Array<Issues>;
  /** An aggregate relationship */
  issues_aggregate: Issues_Aggregate;
  /** fetch data from the table: "issues" using primary key columns */
  issues_by_pk?: Maybe<Issues>;
  /** fetch data from the table: "material" */
  material: Array<Material>;
  /** fetch aggregated fields from the table: "material" */
  material_aggregate: Material_Aggregate;
  /** fetch data from the table: "material" using primary key columns */
  material_by_pk?: Maybe<Material>;
  /** fetch data from the table: "paid_by" */
  paid_by: Array<Paid_By>;
  /** fetch aggregated fields from the table: "paid_by" */
  paid_by_aggregate: Paid_By_Aggregate;
  /** fetch data from the table: "paid_by" using primary key columns */
  paid_by_by_pk?: Maybe<Paid_By>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: Role_Aggregate;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<Role>;
  /** fetch data from the table: "severity" */
  severity: Array<Severity>;
  /** fetch aggregated fields from the table: "severity" */
  severity_aggregate: Severity_Aggregate;
  /** fetch data from the table: "severity" using primary key columns */
  severity_by_pk?: Maybe<Severity>;
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


export type Query_RootIssuesArgs = {
  distinct_on?: InputMaybe<Array<Issues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Issues_Order_By>>;
  where?: InputMaybe<Issues_Bool_Exp>;
};


export type Query_RootIssues_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Issues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Issues_Order_By>>;
  where?: InputMaybe<Issues_Bool_Exp>;
};


export type Query_RootIssues_By_PkArgs = {
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


export type Query_RootPaid_ByArgs = {
  distinct_on?: InputMaybe<Array<Paid_By_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Paid_By_Order_By>>;
  where?: InputMaybe<Paid_By_Bool_Exp>;
};


export type Query_RootPaid_By_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Paid_By_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Paid_By_Order_By>>;
  where?: InputMaybe<Paid_By_Bool_Exp>;
};


export type Query_RootPaid_By_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Query_RootRole_By_PkArgs = {
  value: Scalars['String'];
};


export type Query_RootSeverityArgs = {
  distinct_on?: InputMaybe<Array<Severity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Severity_Order_By>>;
  where?: InputMaybe<Severity_Bool_Exp>;
};


export type Query_RootSeverity_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Severity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Severity_Order_By>>;
  where?: InputMaybe<Severity_Bool_Exp>;
};


export type Query_RootSeverity_By_PkArgs = {
  name: Scalars['String'];
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

/** roles of users */
export type Role = {
  __typename?: 'role';
  comment: Scalars['String'];
  /** An array relationship */
  users: Array<User>;
  /** An aggregate relationship */
  users_aggregate: User_Aggregate;
  value: Scalars['String'];
};


/** roles of users */
export type RoleUsersArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


/** roles of users */
export type RoleUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** aggregated selection of "role" */
export type Role_Aggregate = {
  __typename?: 'role_aggregate';
  aggregate?: Maybe<Role_Aggregate_Fields>;
  nodes: Array<Role>;
};

/** aggregate fields of "role" */
export type Role_Aggregate_Fields = {
  __typename?: 'role_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Role_Max_Fields>;
  min?: Maybe<Role_Min_Fields>;
};


/** aggregate fields of "role" */
export type Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "role". All fields are combined with a logical 'AND'. */
export type Role_Bool_Exp = {
  _and?: InputMaybe<Array<Role_Bool_Exp>>;
  _not?: InputMaybe<Role_Bool_Exp>;
  _or?: InputMaybe<Array<Role_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  users?: InputMaybe<User_Bool_Exp>;
  value?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "role" */
export enum Role_Constraint {
  /** unique or primary key constraint on columns "value" */
  RolePkey = 'role_pkey'
}

export enum Role_Enum {
  /** admin */
  Admin = 'admin',
  /** customer */
  Customer = 'customer',
  /** maintainer */
  Maintainer = 'maintainer',
  /** serviceEngineer */
  ServiceEngineer = 'serviceEngineer',
  /** tenantAdmin */
  TenantAdmin = 'tenantAdmin',
  /** terminal */
  Terminal = 'terminal'
}

/** Boolean expression to compare columns of type "role_enum". All fields are combined with logical 'AND'. */
export type Role_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Role_Enum>;
  _in?: InputMaybe<Array<Role_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Role_Enum>;
  _nin?: InputMaybe<Array<Role_Enum>>;
};

/** input type for inserting data into table "role" */
export type Role_Insert_Input = {
  comment?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<User_Arr_Rel_Insert_Input>;
  value?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Role_Max_Fields = {
  __typename?: 'role_max_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Role_Min_Fields = {
  __typename?: 'role_min_fields';
  comment?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "role" */
export type Role_Mutation_Response = {
  __typename?: 'role_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Role>;
};

/** input type for inserting object relation for remote table "role" */
export type Role_Obj_Rel_Insert_Input = {
  data: Role_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Role_On_Conflict>;
};

/** on_conflict condition type for table "role" */
export type Role_On_Conflict = {
  constraint: Role_Constraint;
  update_columns?: Array<Role_Update_Column>;
  where?: InputMaybe<Role_Bool_Exp>;
};

/** Ordering options when selecting data from "role". */
export type Role_Order_By = {
  comment?: InputMaybe<Order_By>;
  users_aggregate?: InputMaybe<User_Aggregate_Order_By>;
  value?: InputMaybe<Order_By>;
};

/** primary key columns input for table: role */
export type Role_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "role" */
export enum Role_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "role" */
export type Role_Set_Input = {
  comment?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

/** update columns of table "role" */
export enum Role_Update_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  Value = 'value'
}

/** columns and relationships of "severity" */
export type Severity = {
  __typename?: 'severity';
  /** An array relationship */
  issues: Array<Issues>;
  /** An aggregate relationship */
  issues_aggregate: Issues_Aggregate;
  name: Scalars['String'];
};


/** columns and relationships of "severity" */
export type SeverityIssuesArgs = {
  distinct_on?: InputMaybe<Array<Issues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Issues_Order_By>>;
  where?: InputMaybe<Issues_Bool_Exp>;
};


/** columns and relationships of "severity" */
export type SeverityIssues_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Issues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Issues_Order_By>>;
  where?: InputMaybe<Issues_Bool_Exp>;
};

/** aggregated selection of "severity" */
export type Severity_Aggregate = {
  __typename?: 'severity_aggregate';
  aggregate?: Maybe<Severity_Aggregate_Fields>;
  nodes: Array<Severity>;
};

/** aggregate fields of "severity" */
export type Severity_Aggregate_Fields = {
  __typename?: 'severity_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Severity_Max_Fields>;
  min?: Maybe<Severity_Min_Fields>;
};


/** aggregate fields of "severity" */
export type Severity_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Severity_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "severity". All fields are combined with a logical 'AND'. */
export type Severity_Bool_Exp = {
  _and?: InputMaybe<Array<Severity_Bool_Exp>>;
  _not?: InputMaybe<Severity_Bool_Exp>;
  _or?: InputMaybe<Array<Severity_Bool_Exp>>;
  issues?: InputMaybe<Issues_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "severity" */
export enum Severity_Constraint {
  /** unique or primary key constraint on columns "name" */
  SeverityPkey = 'severity_pkey'
}

/** input type for inserting data into table "severity" */
export type Severity_Insert_Input = {
  issues?: InputMaybe<Issues_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Severity_Max_Fields = {
  __typename?: 'severity_max_fields';
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Severity_Min_Fields = {
  __typename?: 'severity_min_fields';
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "severity" */
export type Severity_Mutation_Response = {
  __typename?: 'severity_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Severity>;
};

/** input type for inserting object relation for remote table "severity" */
export type Severity_Obj_Rel_Insert_Input = {
  data: Severity_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Severity_On_Conflict>;
};

/** on_conflict condition type for table "severity" */
export type Severity_On_Conflict = {
  constraint: Severity_Constraint;
  update_columns?: Array<Severity_Update_Column>;
  where?: InputMaybe<Severity_Bool_Exp>;
};

/** Ordering options when selecting data from "severity". */
export type Severity_Order_By = {
  issues_aggregate?: InputMaybe<Issues_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: severity */
export type Severity_Pk_Columns_Input = {
  name: Scalars['String'];
};

/** select columns of table "severity" */
export enum Severity_Select_Column {
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "severity" */
export type Severity_Set_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "severity" */
export enum Severity_Update_Column {
  /** column name */
  Name = 'name'
}

export type Subscription_Root = {
  __typename?: 'subscription_root';
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
  /** An array relationship */
  issues: Array<Issues>;
  /** An aggregate relationship */
  issues_aggregate: Issues_Aggregate;
  /** fetch data from the table: "issues" using primary key columns */
  issues_by_pk?: Maybe<Issues>;
  /** fetch data from the table: "material" */
  material: Array<Material>;
  /** fetch aggregated fields from the table: "material" */
  material_aggregate: Material_Aggregate;
  /** fetch data from the table: "material" using primary key columns */
  material_by_pk?: Maybe<Material>;
  /** fetch data from the table: "paid_by" */
  paid_by: Array<Paid_By>;
  /** fetch aggregated fields from the table: "paid_by" */
  paid_by_aggregate: Paid_By_Aggregate;
  /** fetch data from the table: "paid_by" using primary key columns */
  paid_by_by_pk?: Maybe<Paid_By>;
  /** fetch data from the table: "role" */
  role: Array<Role>;
  /** fetch aggregated fields from the table: "role" */
  role_aggregate: Role_Aggregate;
  /** fetch data from the table: "role" using primary key columns */
  role_by_pk?: Maybe<Role>;
  /** fetch data from the table: "severity" */
  severity: Array<Severity>;
  /** fetch aggregated fields from the table: "severity" */
  severity_aggregate: Severity_Aggregate;
  /** fetch data from the table: "severity" using primary key columns */
  severity_by_pk?: Maybe<Severity>;
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


export type Subscription_RootIssuesArgs = {
  distinct_on?: InputMaybe<Array<Issues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Issues_Order_By>>;
  where?: InputMaybe<Issues_Bool_Exp>;
};


export type Subscription_RootIssues_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Issues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Issues_Order_By>>;
  where?: InputMaybe<Issues_Bool_Exp>;
};


export type Subscription_RootIssues_By_PkArgs = {
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


export type Subscription_RootPaid_ByArgs = {
  distinct_on?: InputMaybe<Array<Paid_By_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Paid_By_Order_By>>;
  where?: InputMaybe<Paid_By_Bool_Exp>;
};


export type Subscription_RootPaid_By_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Paid_By_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Paid_By_Order_By>>;
  where?: InputMaybe<Paid_By_Bool_Exp>;
};


export type Subscription_RootPaid_By_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootRoleArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Role_Order_By>>;
  where?: InputMaybe<Role_Bool_Exp>;
};


export type Subscription_RootRole_By_PkArgs = {
  value: Scalars['String'];
};


export type Subscription_RootSeverityArgs = {
  distinct_on?: InputMaybe<Array<Severity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Severity_Order_By>>;
  where?: InputMaybe<Severity_Bool_Exp>;
};


export type Subscription_RootSeverity_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Severity_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Severity_Order_By>>;
  where?: InputMaybe<Severity_Bool_Exp>;
};


export type Subscription_RootSeverity_By_PkArgs = {
  name: Scalars['String'];
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
  /** An object relationship */
  maintainer?: Maybe<User>;
  maintainer_id?: Maybe<Scalars['uuid']>;
  metadata: Scalars['json'];
  name: Scalars['String'];
  payment_pending: Scalars['Boolean'];
  phone: Scalars['String'];
  razorpay_id: Scalars['String'];
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

/** order by aggregate values of table "tenents" */
export type Tenents_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tenents_Max_Order_By>;
  min?: InputMaybe<Tenents_Min_Order_By>;
};

/** input type for inserting array relation for remote table "tenents" */
export type Tenents_Arr_Rel_Insert_Input = {
  data: Array<Tenents_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Tenents_On_Conflict>;
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
  maintainer?: InputMaybe<User_Bool_Exp>;
  maintainer_id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Json_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  payment_pending?: InputMaybe<Boolean_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  razorpay_id?: InputMaybe<String_Comparison_Exp>;
  users?: InputMaybe<User_Bool_Exp>;
  weighbridges?: InputMaybe<Weighbridge_Bool_Exp>;
};

/** unique or primary key constraints on table "tenents" */
export enum Tenents_Constraint {
  /** unique or primary key constraint on columns "email" */
  TenentsEmailKey = 'tenents_email_key',
  /** unique or primary key constraint on columns "id" */
  TenentsPkey = 'tenents_pkey',
  /** unique or primary key constraint on columns "razorpay_id" */
  TenentsRazorpayIdKey = 'tenents_razorpay_id_key'
}

/** input type for inserting data into table "tenents" */
export type Tenents_Insert_Input = {
  activate?: InputMaybe<Scalars['Boolean']>;
  bills?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  customers?: InputMaybe<Customer_Arr_Rel_Insert_Input>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  maintainer?: InputMaybe<User_Obj_Rel_Insert_Input>;
  maintainer_id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  payment_pending?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  razorpay_id?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<User_Arr_Rel_Insert_Input>;
  weighbridges?: InputMaybe<Weighbridge_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Tenents_Max_Fields = {
  __typename?: 'tenents_max_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  maintainer_id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  razorpay_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "tenents" */
export type Tenents_Max_Order_By = {
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintainer_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  razorpay_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tenents_Min_Fields = {
  __typename?: 'tenents_min_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  maintainer_id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  razorpay_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "tenents" */
export type Tenents_Min_Order_By = {
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maintainer_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  razorpay_id?: InputMaybe<Order_By>;
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
  maintainer?: InputMaybe<User_Order_By>;
  maintainer_id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  payment_pending?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  razorpay_id?: InputMaybe<Order_By>;
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
  MaintainerId = 'maintainer_id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Name = 'name',
  /** column name */
  PaymentPending = 'payment_pending',
  /** column name */
  Phone = 'phone',
  /** column name */
  RazorpayId = 'razorpay_id'
}

/** input type for updating data in table "tenents" */
export type Tenents_Set_Input = {
  activate?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  maintainer_id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['json']>;
  name?: InputMaybe<Scalars['String']>;
  payment_pending?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  razorpay_id?: InputMaybe<Scalars['String']>;
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
  MaintainerId = 'maintainer_id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Name = 'name',
  /** column name */
  PaymentPending = 'payment_pending',
  /** column name */
  Phone = 'phone',
  /** column name */
  RazorpayId = 'razorpay_id'
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
  blocked?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['timestamptz'];
  email: Scalars['String'];
  email_verified?: Maybe<Scalars['Boolean']>;
  forgot_password_token_hash?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An array relationship */
  issues: Array<Issues>;
  /** An aggregate relationship */
  issues_aggregate: Issues_Aggregate;
  /** An array relationship */
  maintainee: Array<Tenents>;
  /** An aggregate relationship */
  maintainee_aggregate: Tenents_Aggregate;
  meta_data?: Maybe<Scalars['json']>;
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['json']>;
  refresh_token_hash?: Maybe<Scalars['String']>;
  role?: Maybe<Role_Enum>;
  /** An object relationship */
  roleByRole?: Maybe<Role>;
  /** An object relationship */
  tenent?: Maybe<Tenents>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  weighbridge?: Maybe<Weighbridge>;
  weighbridge_id?: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "user" */
export type UserIssuesArgs = {
  distinct_on?: InputMaybe<Array<Issues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Issues_Order_By>>;
  where?: InputMaybe<Issues_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserIssues_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Issues_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Issues_Order_By>>;
  where?: InputMaybe<Issues_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMaintaineeArgs = {
  distinct_on?: InputMaybe<Array<Tenents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenents_Order_By>>;
  where?: InputMaybe<Tenents_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserMaintainee_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tenents_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Tenents_Order_By>>;
  where?: InputMaybe<Tenents_Bool_Exp>;
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
  blocked?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  email_verified?: InputMaybe<Boolean_Comparison_Exp>;
  forgot_password_token_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  issues?: InputMaybe<Issues_Bool_Exp>;
  maintainee?: InputMaybe<Tenents_Bool_Exp>;
  meta_data?: InputMaybe<Json_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  profile?: InputMaybe<Json_Comparison_Exp>;
  refresh_token_hash?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<Role_Enum_Comparison_Exp>;
  roleByRole?: InputMaybe<Role_Bool_Exp>;
  tenent?: InputMaybe<Tenents_Bool_Exp>;
  tenent_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  weighbridge?: InputMaybe<Weighbridge_Bool_Exp>;
  weighbridge_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint on columns "email" */
  UserEmailKey = 'user_email_key',
  /** unique or primary key constraint on columns "id" */
  UserPkey = 'user_pkey'
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  email_verified?: InputMaybe<Scalars['Boolean']>;
  forgot_password_token_hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  issues?: InputMaybe<Issues_Arr_Rel_Insert_Input>;
  maintainee?: InputMaybe<Tenents_Arr_Rel_Insert_Input>;
  meta_data?: InputMaybe<Scalars['json']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['json']>;
  refresh_token_hash?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role_Enum>;
  roleByRole?: InputMaybe<Role_Obj_Rel_Insert_Input>;
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
  forgot_password_token_hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  refresh_token_hash?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  weighbridge_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  forgot_password_token_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  refresh_token_hash?: InputMaybe<Order_By>;
  tenent_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  weighbridge_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  forgot_password_token_hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  password?: Maybe<Scalars['String']>;
  refresh_token_hash?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  weighbridge_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  forgot_password_token_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  refresh_token_hash?: InputMaybe<Order_By>;
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

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  blocked?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  email_verified?: InputMaybe<Order_By>;
  forgot_password_token_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  issues_aggregate?: InputMaybe<Issues_Aggregate_Order_By>;
  maintainee_aggregate?: InputMaybe<Tenents_Aggregate_Order_By>;
  meta_data?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  profile?: InputMaybe<Order_By>;
  refresh_token_hash?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  roleByRole?: InputMaybe<Role_Order_By>;
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
  Blocked = 'blocked',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  ForgotPasswordTokenHash = 'forgot_password_token_hash',
  /** column name */
  Id = 'id',
  /** column name */
  MetaData = 'meta_data',
  /** column name */
  Password = 'password',
  /** column name */
  Profile = 'profile',
  /** column name */
  RefreshTokenHash = 'refresh_token_hash',
  /** column name */
  Role = 'role',
  /** column name */
  TenentId = 'tenent_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WeighbridgeId = 'weighbridge_id'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  email_verified?: InputMaybe<Scalars['Boolean']>;
  forgot_password_token_hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  meta_data?: InputMaybe<Scalars['json']>;
  password?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['json']>;
  refresh_token_hash?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role_Enum>;
  tenent_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
  weighbridge_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  Blocked = 'blocked',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  ForgotPasswordTokenHash = 'forgot_password_token_hash',
  /** column name */
  Id = 'id',
  /** column name */
  MetaData = 'meta_data',
  /** column name */
  Password = 'password',
  /** column name */
  Profile = 'profile',
  /** column name */
  RefreshTokenHash = 'refresh_token_hash',
  /** column name */
  Role = 'role',
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
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  manufacturer: Scalars['String'];
  name: Scalars['String'];
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
  count: Scalars['Int'];
  max?: Maybe<Vehicle_Max_Fields>;
  min?: Maybe<Vehicle_Min_Fields>;
};


/** aggregate fields of "vehicle" */
export type Vehicle_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Vehicle_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "vehicle". All fields are combined with a logical 'AND'. */
export type Vehicle_Bool_Exp = {
  _and?: InputMaybe<Array<Vehicle_Bool_Exp>>;
  _not?: InputMaybe<Vehicle_Bool_Exp>;
  _or?: InputMaybe<Array<Vehicle_Bool_Exp>>;
  bills?: InputMaybe<Bill_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  manufacturer?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "vehicle" */
export enum Vehicle_Constraint {
  /** unique or primary key constraint on columns "id" */
  VehiclePkey = 'vehicle_pkey'
}

/** input type for inserting data into table "vehicle" */
export type Vehicle_Insert_Input = {
  bills?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Vehicle_Max_Fields = {
  __typename?: 'vehicle_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  manufacturer?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Vehicle_Min_Fields = {
  __typename?: 'vehicle_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  manufacturer?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  manufacturer?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: vehicle */
export type Vehicle_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "vehicle" */
export enum Vehicle_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "vehicle" */
export type Vehicle_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "vehicle" */
export enum Vehicle_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Manufacturer = 'manufacturer',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** columns and relationships of "weighbridge" */
export type Weighbridge = {
  __typename?: 'weighbridge';
  address: Scalars['String'];
  /** An array relationship */
  bills: Array<Bill>;
  /** An aggregate relationship */
  bills_aggregate: Bill_Aggregate;
  camera_url_1?: Maybe<Scalars['String']>;
  camera_url_2?: Maybe<Scalars['String']>;
  camera_url_3?: Maybe<Scalars['String']>;
  camera_url_4?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  display_name: Scalars['String'];
  id: Scalars['uuid'];
  local_server_url?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  mail: Scalars['String'];
  maintainer_id?: Maybe<Scalars['String']>;
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
  camera_url_1?: InputMaybe<String_Comparison_Exp>;
  camera_url_2?: InputMaybe<String_Comparison_Exp>;
  camera_url_3?: InputMaybe<String_Comparison_Exp>;
  camera_url_4?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  local_server_url?: InputMaybe<String_Comparison_Exp>;
  logo?: InputMaybe<String_Comparison_Exp>;
  mail?: InputMaybe<String_Comparison_Exp>;
  maintainer_id?: InputMaybe<String_Comparison_Exp>;
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
  /** unique or primary key constraint on columns "id" */
  WeighbridgePkey = 'weighbridge_pkey'
}

/** input type for inserting data into table "weighbridge" */
export type Weighbridge_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  bills?: InputMaybe<Bill_Arr_Rel_Insert_Input>;
  camera_url_1?: InputMaybe<Scalars['String']>;
  camera_url_2?: InputMaybe<Scalars['String']>;
  camera_url_3?: InputMaybe<Scalars['String']>;
  camera_url_4?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  local_server_url?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  mail?: InputMaybe<Scalars['String']>;
  maintainer_id?: InputMaybe<Scalars['String']>;
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
  camera_url_1?: Maybe<Scalars['String']>;
  camera_url_2?: Maybe<Scalars['String']>;
  camera_url_3?: Maybe<Scalars['String']>;
  camera_url_4?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  local_server_url?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  maintainer_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  pin_code?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "weighbridge" */
export type Weighbridge_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  camera_url_1?: InputMaybe<Order_By>;
  camera_url_2?: InputMaybe<Order_By>;
  camera_url_3?: InputMaybe<Order_By>;
  camera_url_4?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  local_server_url?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  mail?: InputMaybe<Order_By>;
  maintainer_id?: InputMaybe<Order_By>;
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
  camera_url_1?: Maybe<Scalars['String']>;
  camera_url_2?: Maybe<Scalars['String']>;
  camera_url_3?: Maybe<Scalars['String']>;
  camera_url_4?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  display_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  local_server_url?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  maintainer_id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  pin_code?: Maybe<Scalars['String']>;
  tenent_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "weighbridge" */
export type Weighbridge_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  camera_url_1?: InputMaybe<Order_By>;
  camera_url_2?: InputMaybe<Order_By>;
  camera_url_3?: InputMaybe<Order_By>;
  camera_url_4?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  local_server_url?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  mail?: InputMaybe<Order_By>;
  maintainer_id?: InputMaybe<Order_By>;
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
  camera_url_1?: InputMaybe<Order_By>;
  camera_url_2?: InputMaybe<Order_By>;
  camera_url_3?: InputMaybe<Order_By>;
  camera_url_4?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  local_server_url?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  mail?: InputMaybe<Order_By>;
  maintainer_id?: InputMaybe<Order_By>;
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
  CameraUrl_1 = 'camera_url_1',
  /** column name */
  CameraUrl_2 = 'camera_url_2',
  /** column name */
  CameraUrl_3 = 'camera_url_3',
  /** column name */
  CameraUrl_4 = 'camera_url_4',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  LocalServerUrl = 'local_server_url',
  /** column name */
  Logo = 'logo',
  /** column name */
  Mail = 'mail',
  /** column name */
  MaintainerId = 'maintainer_id',
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
  camera_url_1?: InputMaybe<Scalars['String']>;
  camera_url_2?: InputMaybe<Scalars['String']>;
  camera_url_3?: InputMaybe<Scalars['String']>;
  camera_url_4?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  display_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  local_server_url?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  mail?: InputMaybe<Scalars['String']>;
  maintainer_id?: InputMaybe<Scalars['String']>;
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
  CameraUrl_1 = 'camera_url_1',
  /** column name */
  CameraUrl_2 = 'camera_url_2',
  /** column name */
  CameraUrl_3 = 'camera_url_3',
  /** column name */
  CameraUrl_4 = 'camera_url_4',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Id = 'id',
  /** column name */
  LocalServerUrl = 'local_server_url',
  /** column name */
  Logo = 'logo',
  /** column name */
  Mail = 'mail',
  /** column name */
  MaintainerId = 'maintainer_id',
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

export type GetTotalBillsSubscriptionVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Bill_Order_By> | Bill_Order_By>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetTotalBillsSubscription = { __typename?: 'subscription_root', bill_aggregate: { __typename?: 'bill_aggregate', aggregate?: { __typename?: 'bill_aggregate_fields', count: number } | null } };

export type GetBillForReceptQueryVariables = Exact<{
  billByPkId: Scalars['uuid'];
}>;


export type GetBillForReceptQuery = { __typename?: 'query_root', bill_by_pk?: { __typename?: 'bill', id: any, vehicle_number: string, created_at: any, charges: any, scale_weight: number, nano_id: number, second_weight: boolean, tare_weight: number, order_id?: string | null, reference_bill_id?: any | null, paid_by: Paid_By_Enum, vehicle: { __typename?: 'vehicle', name: string, id: any }, customer?: { __typename?: 'customer', id: any, name: string } | null, material: { __typename?: 'material', name: string, id: any }, weighbridge: { __typename?: 'weighbridge', display_name: string, id: any, address: string, pin_code: string, phone: string, logo?: string | null } } | null };

export type GetAllBillsSubscriptionVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Bill_Order_By> | Bill_Order_By>;
  distinctOn?: InputMaybe<Array<Bill_Select_Column> | Bill_Select_Column>;
}>;


export type GetAllBillsSubscription = { __typename?: 'subscription_root', bill: Array<{ __typename?: 'bill', id: any, vehicle_number: string, charges: any, created_at: any, paid_by: Paid_By_Enum, paid?: boolean | null, payment_initiated?: boolean | null, order_id?: string | null, second_weight: boolean, scale_weight: number, tare_weight: number, weighbridge: { __typename?: 'weighbridge', name: string, id: any }, vehicle: { __typename?: 'vehicle', name: string }, material: { __typename?: 'material', name: string } }> };

export type GetCustomerDropdownOptionsQueryVariables = Exact<{
  where?: InputMaybe<Customer_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetCustomerDropdownOptionsQuery = { __typename?: 'query_root', customer: Array<{ __typename?: 'customer', value: any, label: string }> };

export type GetMaterialDropDownListQueryVariables = Exact<{
  where?: InputMaybe<Material_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetMaterialDropDownListQuery = { __typename?: 'query_root', material: Array<{ __typename?: 'material', value: any, label: string }> };

export type GetVehiclesDropDownListQueryVariables = Exact<{
  where?: InputMaybe<Vehicle_Bool_Exp>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetVehiclesDropDownListQuery = { __typename?: 'query_root', vehicle: Array<{ __typename?: 'vehicle', value: any, label: string }> };

export type GetWeighbridgesDropDownQueryVariables = Exact<{
  where?: InputMaybe<Weighbridge_Bool_Exp>;
}>;


export type GetWeighbridgesDropDownQuery = { __typename?: 'query_root', weighbridge: Array<{ __typename?: 'weighbridge', label: string, value: any }> };

export type BillAggregateQueryVariables = Exact<{
  distinctOn?: InputMaybe<Array<Bill_Select_Column> | Bill_Select_Column>;
  where?: InputMaybe<Bill_Bool_Exp>;
}>;


export type BillAggregateQuery = { __typename?: 'query_root', bill_aggregate: { __typename?: 'bill_aggregate', aggregate?: { __typename?: 'bill_aggregate_fields', count: number } | null } };

export type GetTotalWeighbridgesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalWeighbridgesQuery = { __typename?: 'query_root', weighbridge_aggregate: { __typename?: 'weighbridge_aggregate', aggregate?: { __typename?: 'weighbridge_aggregate_fields', count: number } | null } };

export type GetTotalAmountQueryVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
}>;


export type GetTotalAmountQuery = { __typename?: 'query_root', bill_aggregate: { __typename?: 'bill_aggregate', aggregate?: { __typename?: 'bill_aggregate_fields', sum?: { __typename?: 'bill_sum_fields', charges?: any | null } | null } | null } };

export type GetTotalEntriesQueryVariables = Exact<{
  where?: InputMaybe<Bill_Bool_Exp>;
}>;


export type GetTotalEntriesQuery = { __typename?: 'query_root', bill_aggregate: { __typename?: 'bill_aggregate', aggregate?: { __typename?: 'bill_aggregate_fields', count: number } | null } };


export const GetTotalBillsDocument = gql`
    subscription getTotalBills($where: bill_bool_exp, $offset: Int, $orderBy: [bill_order_by!], $limit: Int) {
  bill_aggregate(
    where: $where
    offset: $offset
    order_by: $orderBy
    limit: $limit
  ) {
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
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTotalBillsSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetTotalBillsSubscription, GetTotalBillsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetTotalBillsSubscription, GetTotalBillsSubscriptionVariables>(GetTotalBillsDocument, options);
      }
export type GetTotalBillsSubscriptionHookResult = ReturnType<typeof useGetTotalBillsSubscription>;
export type GetTotalBillsSubscriptionResult = Apollo.SubscriptionResult<GetTotalBillsSubscription>;
export const GetBillForReceptDocument = gql`
    query getBillForRecept($billByPkId: uuid!) {
  bill_by_pk(id: $billByPkId) {
    id
    vehicle_number
    created_at
    charges
    scale_weight
    nano_id
    second_weight
    tare_weight
    order_id
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
    created_at
    material {
      name
    }
    paid_by
    paid
    payment_initiated
    order_id
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
export const GetWeighbridgesDropDownDocument = gql`
    query getWeighbridgesDropDown($where: weighbridge_bool_exp) {
  weighbridge(where: $where) {
    label: name
    value: id
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
export const BillAggregateDocument = gql`
    query BillAggregate($distinctOn: [bill_select_column!], $where: bill_bool_exp) {
  bill_aggregate(distinct_on: $distinctOn, where: $where) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useBillAggregateQuery__
 *
 * To run a query within a React component, call `useBillAggregateQuery` and pass it any options that fit your needs.
 * When your component renders, `useBillAggregateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBillAggregateQuery({
 *   variables: {
 *      distinctOn: // value for 'distinctOn'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBillAggregateQuery(baseOptions?: Apollo.QueryHookOptions<BillAggregateQuery, BillAggregateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BillAggregateQuery, BillAggregateQueryVariables>(BillAggregateDocument, options);
      }
export function useBillAggregateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BillAggregateQuery, BillAggregateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BillAggregateQuery, BillAggregateQueryVariables>(BillAggregateDocument, options);
        }
export type BillAggregateQueryHookResult = ReturnType<typeof useBillAggregateQuery>;
export type BillAggregateLazyQueryHookResult = ReturnType<typeof useBillAggregateLazyQuery>;
export type BillAggregateQueryResult = Apollo.QueryResult<BillAggregateQuery, BillAggregateQueryVariables>;
export const GetTotalWeighbridgesDocument = gql`
    query getTotalWeighbridges {
  weighbridge_aggregate {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetTotalWeighbridgesQuery__
 *
 * To run a query within a React component, call `useGetTotalWeighbridgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalWeighbridgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalWeighbridgesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTotalWeighbridgesQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalWeighbridgesQuery, GetTotalWeighbridgesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalWeighbridgesQuery, GetTotalWeighbridgesQueryVariables>(GetTotalWeighbridgesDocument, options);
      }
export function useGetTotalWeighbridgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalWeighbridgesQuery, GetTotalWeighbridgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalWeighbridgesQuery, GetTotalWeighbridgesQueryVariables>(GetTotalWeighbridgesDocument, options);
        }
export type GetTotalWeighbridgesQueryHookResult = ReturnType<typeof useGetTotalWeighbridgesQuery>;
export type GetTotalWeighbridgesLazyQueryHookResult = ReturnType<typeof useGetTotalWeighbridgesLazyQuery>;
export type GetTotalWeighbridgesQueryResult = Apollo.QueryResult<GetTotalWeighbridgesQuery, GetTotalWeighbridgesQueryVariables>;
export const GetTotalAmountDocument = gql`
    query getTotalAmount($where: bill_bool_exp) {
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
 * __useGetTotalAmountQuery__
 *
 * To run a query within a React component, call `useGetTotalAmountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalAmountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalAmountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetTotalAmountQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalAmountQuery, GetTotalAmountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalAmountQuery, GetTotalAmountQueryVariables>(GetTotalAmountDocument, options);
      }
export function useGetTotalAmountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalAmountQuery, GetTotalAmountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalAmountQuery, GetTotalAmountQueryVariables>(GetTotalAmountDocument, options);
        }
export type GetTotalAmountQueryHookResult = ReturnType<typeof useGetTotalAmountQuery>;
export type GetTotalAmountLazyQueryHookResult = ReturnType<typeof useGetTotalAmountLazyQuery>;
export type GetTotalAmountQueryResult = Apollo.QueryResult<GetTotalAmountQuery, GetTotalAmountQueryVariables>;
export const GetTotalEntriesDocument = gql`
    query getTotalEntries($where: bill_bool_exp) {
  bill_aggregate(where: $where) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useGetTotalEntriesQuery__
 *
 * To run a query within a React component, call `useGetTotalEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalEntriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetTotalEntriesQuery(baseOptions?: Apollo.QueryHookOptions<GetTotalEntriesQuery, GetTotalEntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalEntriesQuery, GetTotalEntriesQueryVariables>(GetTotalEntriesDocument, options);
      }
export function useGetTotalEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalEntriesQuery, GetTotalEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalEntriesQuery, GetTotalEntriesQueryVariables>(GetTotalEntriesDocument, options);
        }
export type GetTotalEntriesQueryHookResult = ReturnType<typeof useGetTotalEntriesQuery>;
export type GetTotalEntriesLazyQueryHookResult = ReturnType<typeof useGetTotalEntriesLazyQuery>;
export type GetTotalEntriesQueryResult = Apollo.QueryResult<GetTotalEntriesQuery, GetTotalEntriesQueryVariables>;