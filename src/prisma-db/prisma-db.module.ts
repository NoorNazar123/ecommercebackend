import { Module } from '@nestjs/common';
import { PrismaDbService } from './prisma-db.service';

@Module({
  providers: [PrismaDbService],
  exports: [PrismaDbService], // 👈 Make PrismaDbService available for other modules
})
export class PrismaDbModule { }
