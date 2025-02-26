import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @IsInt()
  productId: number; // Product ID for which the review is being submitted

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; // Rating between 1 and 5

  @IsOptional()
  @IsString()
  review?: string; // Optional review text
}
