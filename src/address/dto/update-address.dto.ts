import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string; // Changed from postalCode to zipCode to align with your Prisma model
  isDefault?: boolean;
  addressType: string;
  fullAddress?: string | undefined;
}
