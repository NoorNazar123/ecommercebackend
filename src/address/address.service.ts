import { Injectable } from '@nestjs/common';
import { PrismaDbService } from '../prisma-db/prisma-db.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaDbService) {}
  // async createAddress(userId: number, createAddressDto: CreateAddressDto) {
  //   // Check if the address type is 'home' and set it as default
  //   if (createAddressDto.addressType === 'home') {
  //     createAddressDto.isDefault = true;

  //     // If it's a home address, unset the default flag for other addresses
  //     await this.prisma.address.updateMany({
  //       where: { userId, isDefault: true },
  //       data: { isDefault: false },
  //     });
  //   } else {
  //     createAddressDto.isDefault = false; // Set default as false for non-home addresses
  //   }

  //   // Create the address in the database with userId
  //   return this.prisma.address.create({
  //     data: {
  //       ...createAddressDto,
  //       userId, // Add the userId here
  //     },
  //   });
  // }
  // async createAddress(userId: number, createAddressDto: CreateAddressDto) {
  //   console.log('Received address type:', createAddressDto.addressType); // Add this for debugging

  //   if (createAddressDto.addressType === 'home') {
  //     createAddressDto.isDefault = true;

  //     await this.prisma.address.updateMany({
  //       where: { userId, isDefault: true },
  //       data: { isDefault: false },
  //     });
  //   } else {
  //     createAddressDto.isDefault = false;
  //   }

  //   return this.prisma.address.create({
  //     data: {
  //       ...createAddressDto,
  //       userId,
  //     },
  //   });
  // }
  async createAddress(userId: number, createAddressDto: CreateAddressDto) {
    // Check if the address already exists for the user with the same addressType
    const existingAddress = await this.prisma.address.findFirst({
      where: { userId, addressType: createAddressDto.addressType },
    });

    // If an address already exists and is of the same type, update it
    if (existingAddress) {
      // If the new address is marked as default, set it as the default address
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

      // Update the existing address with the new data
      return this.prisma.address.update({
        where: { id: existingAddress.id },
        data: { ...createAddressDto },
      });
    } else {
      // If no address exists, create a new one
      if (createAddressDto.addressType === 'home') {
        // Ensure only one home address is default
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
    // If the address is set as default, unset the default flag for other addresses
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

  //   async getUserAddresses(userId: number, isHome: boolean = false) {
  //     if (isHome) {
  //       return this.prisma.address.findFirst({
  //         where: {
  //           userId: userId,
  //           isDefault: true, // Only fetch the home address
  //         },
  //       });
  //     }
  //     // Default behavior: fetch all addresses
  //     return this.prisma.address.findMany({
  //       where: { userId: userId },
  //     });
  //   }
  // }
  async getUserAddresses(userId: number) {
    // Fetching all addresses for the user
    const addresses = await this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' }, // Optional: This will ensure the default address is returned first
    });

    // Returning the addresses in the desired format
    return {
      addresses: addresses.map((address) => ({
        ...address,
        isDefault: address.isDefault, // Ensure the 'isDefault' field is included in the result
      })),
    };
  }
}

// import { Injectable } from '@nestjs/common';
// import { CreateAddressDto } from './dto/create-address.dto';
// import { UpdateAddressDto } from './dto/update-address.dto';

// @Injectable()
// export class AddressService {
//   create(createAddressDto: CreateAddressDto) {
//     return 'This action adds a new address';
//   }

//   findAll() {
//     return `This action returns all address`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} address`;
//   }

//   update(id: number, updateAddressDto: UpdateAddressDto) {
//     return `This action updates a #${id} address`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} address`;
//   }
// }
