import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaDbService } from '../prisma-db/prisma-db.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, PrismaDbService],
  exports: [AddressService], // Export only if used in another module
})
export class AddressModule {}
