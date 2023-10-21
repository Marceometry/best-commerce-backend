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
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({ type: CategoryDto })
  create(
    @CurrentUser() user: CurrentUserDto,
    @Body() data: CreateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoriesService.create(user.sub, data);
  }

  @Public()
  @Get('/store/:storeId')
  @ApiResponse({ type: [CategoryDto] })
  findByStore(@Param('storeId') storeId: string): Promise<CategoryDto[]> {
    return this.categoriesService.findByStore(storeId);
  }

  @Public()
  @Get()
  @ApiResponse({ type: [CategoryDto] })
  findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiResponse({ type: CategoryDto })
  findOne(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: CategoryDto })
  update(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoriesService.update(user.sub, id, data);
  }

  @Delete(':id')
  @ApiResponse({ type: CategoryDto })
  remove(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<CategoryDto> {
    return this.categoriesService.remove(user.sub, id);
  }
}
