import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { PurchasesModule } from '@/purchases/purchases.module';
import { StoresModule } from '@/stores/stores.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [PrismaModule, StoresModule, PurchasesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
