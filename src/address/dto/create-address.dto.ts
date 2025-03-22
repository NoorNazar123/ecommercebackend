import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  userId: number;

  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  fullAddress?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @IsString()
  addressType: string; // Make sure addressType matches the model
}
