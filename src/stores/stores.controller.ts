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
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@CurrentUser() user: ICurrentUser, @Body() data: CreateStoreDto) {
    return this.storesService.create(user.sub, data);
  }

  @Public()
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: string,
    @Body() data: UpdateStoreDto,
  ) {
    return this.storesService.update(user.sub, id, data);
  }

  @Delete(':id')
  remove(@CurrentUser() user: ICurrentUser, @Param('id') id: string) {
    return this.storesService.remove(user.sub, id);
  }
}
