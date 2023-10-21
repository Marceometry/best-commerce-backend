import { ApiProperty } from '@nestjs/swagger';
import { PurchaseDto } from '@/purchases/dto/purchase';
import { ProductDto } from './product';

export class PurchasedProductDto extends PurchaseDto {
  @ApiProperty({ type: () => ProductDto })
  product: ProductDto;
}
