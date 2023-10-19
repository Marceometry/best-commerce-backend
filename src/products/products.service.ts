import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PurchasesService } from '@/purchases/purchases.service';
import { StoresService } from '@/stores/stores.service';
import { slugify } from '@/utils';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storesService: StoresService,
    private readonly purchasesService: PurchasesService,
  ) {}

  async create(userId: string, data: CreateProductDto) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        store: { connect: { id: storeId } },
        category: data.category
          ? {
              connectOrCreate: {
                where: { id: data.category.id },
                create: {
                  name: data.category.name,
                  slug: slugify(data.category.name),
                  storeId,
                },
              },
            }
          : undefined,
      },
    });
  }

  findByStore(storeId: string) {
    return this.prisma.product.findMany({ where: { storeId } });
  }

  async findByCategory(storeId: string, slug: string) {
    const category = await this.prisma.category.findFirst({ where: { slug } });
    const products = await this.prisma.product.findMany({
      where: { storeId, category: { id: category.id } },
    });
    return { categoryName: category.name, products };
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(userId: string, id: string, data: UpdateProductDto) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.product.update({
      where: { id, storeId },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
      },
    });
  }

  async remove(userId: string, id: string) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.product.delete({ where: { id, storeId } });
  }

  async buy(userId: string, id: string) {
    const purchase = await this.purchasesService.create(userId, {
      productId: id,
    });
    await this.prisma.product.update({
      where: { id },
      data: { purchases: { connect: { id: purchase.id } } },
    });
    return purchase;
  }
}
