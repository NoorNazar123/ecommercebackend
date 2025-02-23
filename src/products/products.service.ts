import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: PrismaDbService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      // Check if the category exists
      const category = await this.databaseService.category.findUnique({
        where: { id: createProductDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException(
          `Category with ID ${createProductDto.categoryId} not found`
        );
      }

      // Create the product
      return await this.databaseService.product.create({
        data: {
          ...createProductDto,
          price: new Prisma.Decimal(createProductDto.price), // Convert price to Prisma.Decimal
        },
      });
    } catch (error) {
      console.error('Error creating product:', error);
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException
      }
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll(filters?: any) {
    return this.databaseService.product.findMany({
      where: {
        ...(filters.categoryId && { categoryId: filters.categoryId }),
        ...(filters.minPrice && {
          price: { gte: new Prisma.Decimal(filters.minPrice) },
        }),
        ...(filters.maxPrice && {
          price: { lte: new Prisma.Decimal(filters.maxPrice) },
        }),
        ...(filters.stock && { stock: { gte: filters.stock } }),
      },
      include: { category: true },
    });
  }

  async findOne(id: number) {
    const product = await this.databaseService.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.product.delete({
      where: { id },
    });
  }
}

// import {
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
// } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
// import { Prisma } from '@prisma/client';

// @Injectable()
// export class ProductsService {
//   constructor(private readonly databaseService: PrismaDbService) {}

//   async create(createProductDto: CreateProductDto) {
//     try {
//       // Check if the category exists
//       const category = await this.databaseService.category.findUnique({
//         where: { id: createProductDto.categoryId },
//       });

//       if (!category) {
//         throw new NotFoundException(
//           `Category with ID ${createProductDto.categoryId} not found`
//         );
//       }

//       // Create the product
//       return await this.databaseService.product.create({
//         data: {
//           ...createProductDto,
//           price: new Prisma.Decimal(createProductDto.price), // Convert price to Prisma.Decimal
//         },
//       });
//     } catch (error) {
//       console.error('Error creating product:', error);
//       if (error instanceof NotFoundException) {
//         throw error; // Re-throw the NotFoundException
//       }
//       throw new InternalServerErrorException('Failed to create product');
//     }
//   }

//   async findAll() {
//     return this.databaseService.product.findMany();
//   }

//   async findOne(id: number) {
//     return this.databaseService.product.findUnique({
//       where: { id },
//     });
//   }

//   async update(id: number, updateProductDto: UpdateProductDto) {
//     return this.databaseService.product.update({
//       where: { id },
//       data: updateProductDto,
//     });
//   }

//   async remove(id: number) {
//     return this.databaseService.product.delete({
//       where: { id },
//     });
//   }
// }
