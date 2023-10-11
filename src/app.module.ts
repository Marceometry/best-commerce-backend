import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, PurchasesModule],
  controllers: [AppController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
