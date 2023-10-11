import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { StoresModule } from '@/stores/stores.module';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';

@Module({
  imports: [PrismaModule, StoresModule],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
