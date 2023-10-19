import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
