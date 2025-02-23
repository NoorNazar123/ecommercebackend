import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  imports: [PrismaDbModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
