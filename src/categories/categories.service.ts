import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: PrismaDbService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.databaseService.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.databaseService.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.databaseService.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.databaseService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.category.delete({
      where: { id },
    });
  }
}
