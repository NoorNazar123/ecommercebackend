import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { cloudinaryStorage } from 'src/auth/config/cloudinary.storage';
import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';
import { promisify } from 'util';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  writeFile = promisify(fs.writeFile);
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, { storage: cloudinaryStorage }) // Max 5 files
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    console.log('Received Data:', createProductDto);
    console.log('Uploaded Files:', files);

    let imageUrls: string[] = [];

    // 1️⃣ Handle Local File Uploads (Already Done)
    if (files && files.length > 0) {
      imageUrls = files.map((file) => file.path);
    }

    // 2️⃣ Handle Google Image URLs (Upload to Cloudinary)
    if (createProductDto.images && createProductDto.images.length > 0) {
      for (const imageUrl of createProductDto.images) {
        if (imageUrl.startsWith('http')) {
          try {
            const uploadedImageUrl = await this.uploadImageFromUrl(imageUrl);
            imageUrls.push(uploadedImageUrl);
          } catch (error) {
            console.error('Error uploading image from URL:', imageUrl, error);
          }
        }
      }
    }

    // Attach Cloudinary URLs to DTO
    createProductDto.images = imageUrls;

    return this.productsService.create(createProductDto);
  }

  // Helper Function: Upload External Image (Google Image) to Cloudinary
  async uploadImageFromUrl(imageUrl: string): Promise<string> {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });

      const tempFilePath = path.join(tmpdir(), `upload-${Date.now()}.jpg`);
      await this.writeFile(tempFilePath, response.data);

      const result = await cloudinary.uploader.upload(tempFilePath, {
        folder: 'products',
        resource_type: 'auto',
      });

      // Delete temp file after upload
      fs.unlinkSync(tempFilePath);

      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  async findAll(
    @Query('categoryId') categoryId?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('stock') stock?: number
  ) {
    return this.productsService.findAll({
      categoryId,
      minPrice,
      maxPrice,
      stock,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
