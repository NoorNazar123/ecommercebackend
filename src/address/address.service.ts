import { Injectable } from '@nestjs/common';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaDbService) {}

  async createAddress(userId: number, createAddressDto: CreateAddressDto) {
    const existingAddress = await this.prisma.address.findFirst({
      where: { userId, addressType: createAddressDto.addressType },
    });

    if (existingAddress) {
      if (createAddressDto.isDefault) {
        await this.prisma.address.updateMany({
          where: {
            userId,
            addressType: createAddressDto.addressType,
            isDefault: true,
          },
          data: { isDefault: false },
        });
      }

      return this.prisma.address.update({
        where: { id: existingAddress.id },
        data: { ...createAddressDto },
      });
    } else {
      if (createAddressDto.addressType === 'home') {
        createAddressDto.isDefault = true;

        await this.prisma.address.updateMany({
          where: { userId, addressType: 'home', isDefault: true },
          data: { isDefault: false },
        });
      }

      return this.prisma.address.create({
        data: { ...createAddressDto, userId },
      });
    }
  }

  async updateAddress(
    addressId: number,
    userId: number,
    data: UpdateAddressDto
  ) {
    if (data.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return this.prisma.address.update({
      where: { id: addressId, userId },
      data,
    });
  }

  async deleteAddress(addressId: number, userId: number) {
    return this.prisma.address.delete({
      where: { id: addressId, userId },
    });
  }

  async getUserAddresses(userId: number) {
    const addresses = await this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });

    return {
      addresses: addresses.map((address) => ({
        ...address,
        isDefault: address.isDefault,
      })),
    };
  }
}
