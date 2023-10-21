import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { CurrentUserDto } from '@/auth/dto/current-user.dto';
import { PurchaseDto } from './dto/purchase';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchasesService } from './purchases.service';

@ApiTags('purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get('store')
  @ApiResponse({ type: [PurchaseDto] })
  findByStore(@CurrentUser() user: CurrentUserDto): Promise<PurchaseDto[]> {
    return this.purchasesService.findByStore(user.sub);
  }

  @Get('at/store/:storeId')
  @ApiResponse({ type: [PurchaseDto] })
  findByUser(
    @CurrentUser() user: CurrentUserDto,
    @Param('storeId') storeId: string,
  ): Promise<PurchaseDto[]> {
    return this.purchasesService.findByUser(user.sub, storeId);
  }

  @Get(':id')
  @ApiResponse({ type: PurchaseDto })
  findOne(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<PurchaseDto> {
    return this.purchasesService.findOne(user.sub, id);
  }

  @Patch(':id')
  @ApiResponse({ type: PurchaseDto })
  update(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<PurchaseDto> {
    return this.purchasesService.update(user.sub, id, updatePurchaseDto);
  }

  @Delete(':id')
  @ApiResponse({ type: PurchaseDto })
  remove(
    @CurrentUser() user: CurrentUserDto,
    @Param('id') id: string,
  ): Promise<PurchaseDto> {
    return this.purchasesService.remove(user.sub, id);
  }
}
