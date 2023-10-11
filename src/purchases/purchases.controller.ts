import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import {
  CurrentUser,
  ICurrentUser,
} from '@/auth/decorators/current-user.decorator';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(
    @CurrentUser() user: ICurrentUser,
    @Body() createPurchaseDto: CreatePurchaseDto,
  ) {
    return this.purchasesService.create(user.sub, createPurchaseDto);
  }

  @Get('user/:userId')
  findByUser(@CurrentUser() user: ICurrentUser) {
    return this.purchasesService.findByUser(user.sub);
  }

  @Get('store/:userId')
  findByStore(@CurrentUser() user: ICurrentUser) {
    return this.purchasesService.findByStore(user.sub);
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
