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
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreDto } from './dto/store';
import { StoreWithAddressDto } from './dto/store-with-address';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @ApiResponse({ type: StoreDto })
  create(
    @CurrentUser() user: CurrentUserDto,
    @Body() data: CreateStoreDto,
  ): Promise<StoreDto> {
    return this.storesService.create(user.sub, data);
  }

  @Get()
  @ApiResponse({ type: [StoreDto] })
  findUserStore(@CurrentUser() user: CurrentUserDto): Promise<StoreDto> {
    return this.storesService.findByUser(user.sub);
  }

  @Public()
  @Get()
  @ApiResponse({ type: [StoreDto] })
  findAll(): Promise<StoreDto[]> {
    return this.storesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiResponse({ type: StoreWithAddressDto })
  findOne(@Param('id') id: string): Promise<StoreWithAddressDto> {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: StoreDto })
  update(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
    @Body() data: UpdateStoreDto,
  ): Promise<StoreDto> {
    return this.storesService.update(user.sub, id, data);
  }

  @Delete(':id')
  @ApiResponse({ type: StoreDto })
  remove(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<StoreDto> {
    return this.storesService.remove(user.sub, id);
  }
}
