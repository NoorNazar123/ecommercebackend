import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  imports: [PrismaDbModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
