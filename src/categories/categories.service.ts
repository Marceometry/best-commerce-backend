import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { StoresService } from '@/stores/stores.service';
import { slugify } from '@/utils';
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
    const slug = slugify(data.name);
    return this.prisma.category.create({ data: { ...data, slug, storeId } });
  }

  findByStore(storeId: string) {
    return this.prisma.category.findMany({ where: { storeId } });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
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
