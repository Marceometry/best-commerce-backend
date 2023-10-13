import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { StoresModule } from '@/stores/stores.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [PrismaModule, StoresModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
