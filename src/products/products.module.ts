import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { StoresModule } from '@/stores/stores.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [PrismaModule, StoresModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
