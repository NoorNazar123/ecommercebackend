import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Endpoint to create a new review
  @UseGuards(JwtAuthGuard) // Protect route with authentication
  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    const userId = req.user.id; // Get user ID from JWT
    const review = await this.reviewService.createReview(
      userId,
      createReviewDto
    );
    return review;
  }

  // Endpoint to fetch reviews for a specific product
  @Get(':productId')
  async getReviewsForProduct(@Param('productId') productId: number) {
    return this.reviewService.getReviewsForProduct(productId);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  // Update a review by id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    try {
      return await this.reviewService.update(+id, updateReviewDto);
    } catch (error) {
      throw new Error(`Review with id ${id} not found or cannot be updated.`);
    }
  }

  // Remove a review by id
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.reviewService.remove(+id);
    } catch (error) {
      throw new Error(`Review with id ${id} not found or cannot be deleted.`);
    }
  }
}
