import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaDbService) {}

  async createReview(userId: number, createReviewDto: CreateReviewDto) {
    const { productId, rating, review } = createReviewDto;

    // Check if the product exists
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    // Create the review in the database
    return this.prisma.productReview.create({
      data: {
        productId,
        userId,
        rating,
        review,
      },
    });
  }

  // Optional: Fetch reviews for a product
  async getReviewsForProduct(productId: number) {
    return this.prisma.productReview.findMany({
      where: { productId },
    });
  }

  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  findAll() {
    return this.prisma.productReview.findMany();
  }

  // Update a review
  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      return await this.prisma.productReview.update({
        where: { id },
        data: {
          rating: updateReviewDto.rating,
          review: updateReviewDto.review,
        },
      });
    } catch (error) {
      throw new Error(`Review with id ${id} not found.`);
    }
  }

  // Remove a review
  async remove(id: number) {
    try {
      return await this.prisma.productReview.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Review with id ${id} not found.`);
    }
  }
}
