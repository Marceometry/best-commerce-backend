import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  CurrentUser,
  ICurrentUser,
} from '@/auth/decorators/current-user.decorator';
import { Public } from '@/auth/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(
    @CurrentUser() user: ICurrentUser,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(user.sub, createProductDto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(user.sub, id, updateProductDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: ICurrentUser, @Param('id') id: string) {
    return this.productsService.remove(user.sub, id);
  }
}