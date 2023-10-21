import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { Public } from '@/auth/decorators/public.decorator';
import { CurrentUserDto } from '@/auth/dto/current-user.dto';
import { CategoryProductsDto } from './dto/category-products';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product';
import { PurchasedProductDto } from './dto/purchased-product';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({ type: ProductDto })
  create(
    @CurrentUser() user: CurrentUserDto,
    @Body() data: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productsService.create(user.sub, data);
  }

  @Public()
  @Get('/store/:storeId')
  @ApiResponse({ type: [ProductDto] })
  findByStore(@Param('storeId') storeId: string): Promise<ProductDto[]> {
    return this.productsService.findByStore(storeId);
  }

  @Public()
  @Get('/store/:storeId/category/:slug')
  @ApiResponse({ type: CategoryProductsDto })
  findByCategory(
    @Param('storeId') storeId: string,
    @Param('slug') slug: string,
  ): Promise<CategoryProductsDto> {
    return this.productsService.findByCategory(storeId, slug);
  }

  @Public()
  @Get()
  @ApiResponse({ type: [ProductDto] })
  findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiResponse({ type: ProductDto })
  findOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: ProductDto })
  update(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productsService.update(user.sub, id, data);
  }

  @Delete(':id')
  @ApiResponse({ type: ProductDto })
  remove(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<ProductDto> {
    return this.productsService.remove(user.sub, id);
  }

  @Post(':id/buy')
  @ApiResponse({ type: PurchasedProductDto })
  buy(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<PurchasedProductDto> {
    return this.productsService.buy(user.sub, id);
  }
}
