import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CurrentUser,
  ICurrentUser,
} from '@/auth/decorators/current-user.decorator';
import { Public } from '@/auth/decorators/public.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@CurrentUser() user: ICurrentUser, @Body() data: CreateCategoryDto) {
    return this.categoriesService.create(user.sub, data);
  }

  @Public()
  @Get('/store/:storeId')
  findByStore(@Param('storeId') storeId: string) {
    return this.categoriesService.findByStore(storeId);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(user.sub, id, data);
  }

  @Delete(':id')
  remove(@CurrentUser() user: ICurrentUser, @Param('id') id: string) {
    return this.categoriesService.remove(user.sub, id);
  }
}
