import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { StoresModule } from '@/stores/stores.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [PrismaModule, StoresModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
