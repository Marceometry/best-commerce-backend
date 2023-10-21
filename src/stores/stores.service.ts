import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreAddressDto } from './dto/update-store-address.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, data: CreateStoreDto) {
    return this.prisma.store.create({
      data: {
        ...data,
        users: { connect: { id: userId } },
        address: data.address ? { create: data.address } : undefined,
      },
    });
  }

  findAll() {
    return this.prisma.store.findMany();
  }

  findByUser(userId: string) {
    return this.prisma.store.findFirst({
      where: { users: { some: { id: userId } } },
    });
  }

  findOne(id: string) {
    return this.prisma.store.findUnique({
      where: { id },
      include: { address: true },
    });
  }

  update(userId: string, id: string, data: UpdateStoreDto) {
    return this.prisma.store.update({
      where: { id, users: { some: { id: userId } } },
      data,
    });
  }

  updateAddress(userId: string, id: string, data: UpdateStoreAddressDto) {
    return this.prisma.address.update({
      where: { id, store: { users: { some: { id: userId } } } },
      data,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.store.delete({
      where: { id, users: { some: { id: userId } } },
    });
  }
}
