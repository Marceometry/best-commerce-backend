import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { StoresService } from '@/stores/stores.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storesService: StoresService,
  ) {}

  async create(userId: string, data: CreateCategoryDto) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.category.create({ data: { ...data, storeId } });
  }

  findByStore(storeId: string) {
    return this.prisma.category.findMany({ where: { storeId } });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(userId: string, id: string, data: UpdateCategoryDto) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.category.update({ where: { id, storeId }, data });
  }

  async remove(userId: string, id: string) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.category.delete({ where: { id, storeId } });
  }
}
