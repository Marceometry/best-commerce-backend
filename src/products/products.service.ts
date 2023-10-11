import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { StoresService } from '@/stores/stores.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storesService: StoresService,
  ) {}

  async create(userId: string, data: CreateProductDto) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.product.create({ data: { ...data, storeId } });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(userId: string, id: string, data: UpdateProductDto) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.product.update({ where: { id, storeId }, data });
  }

  async remove(userId: string, id: string) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.product.delete({ where: { id, storeId } });
  }
}
