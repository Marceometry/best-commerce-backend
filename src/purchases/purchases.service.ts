import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { StoresService } from '@/stores/stores.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storesService: StoresService,
  ) {}

  async create(userId: string, data: CreatePurchaseDto) {
    return this.prisma.purchase.create({
      data: { ...data, userId },
      include: { product: true },
    });
  }

  findByUser(userId: string, storeId: string) {
    return this.prisma.purchase.findMany({
      where: { userId, product: { storeId } },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByStore(userId: string) {
    const { storeId } = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
    });
    return this.prisma.purchase.findMany({ where: { product: { storeId } } });
  }

  async findOne(userId: string, id: string) {
    const { id: storeId } = await this.storesService.findByUser(userId);
    return this.prisma.purchase.findUnique({
      where: { id, OR: [{ userId }, { product: { storeId } }] },
    });
  }

  async update(userId: string, id: string, data: UpdatePurchaseDto) {
    return this.prisma.purchase.update({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.purchase.delete({ where: { id, userId } });
  }
}
