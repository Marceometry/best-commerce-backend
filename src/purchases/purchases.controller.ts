import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  CurrentUser,
  ICurrentUser,
} from '@/auth/decorators/current-user.decorator';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get('store')
  findByStore(@CurrentUser() user: ICurrentUser) {
    return this.purchasesService.findByStore(user.sub);
  }

  @Get('at/store/:storeId')
  findByUser(
    @CurrentUser() user: ICurrentUser,
    @Param('storeId') storeId: string,
  ) {
    return this.purchasesService.findByUser(user.sub, storeId);
  }

  @Get(':id')
  findOne(@CurrentUser() user: ICurrentUser, @Param('id') id: string) {
    return this.purchasesService.findOne(user.sub, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.update(user.sub, id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: ICurrentUser, @Param('id') id: string) {
    return this.purchasesService.remove(user.sub, id);
  }
}
