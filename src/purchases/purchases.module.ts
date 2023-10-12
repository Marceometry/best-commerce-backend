import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { StoresModule } from '@/stores/stores.module';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [PrismaModule, StoresModule],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
