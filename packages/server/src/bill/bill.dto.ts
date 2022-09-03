import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateBillDto {
  @IsString()
  @IsNotEmpty()
  vehicle_number: string;

  @IsString()
  @IsOptional()
  box_number: string;

  @IsUUID()
  @IsNotEmpty()
  material_id: string;

  @IsUUID()
  @IsNotEmpty()
  vehicle_id: string;

  @IsUUID()
  @IsOptional()
  customer_id: string;

  @IsUUID()
  @IsOptional()
  customer_2_id: string;

  @IsUUID()
  @IsOptional()
  customer_3_id: string;

  @IsString()
  @IsNotEmpty()
  paid_by: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  driver_phone: string;

  @IsNotEmpty()
  charges: string;

  @IsNotEmpty()
  scale_weight: string;

  @IsOptional()
  @IsNotEmpty()
  tare_weight: string;

  @IsOptional()
  @IsUUID()
  reference_bill_id: string;
}
