import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product';

export class CategoryProductsDto {
  @ApiProperty()
  categoryName: string;

  @ApiProperty({ type: () => ProductDto, isArray: true })
  products: ProductDto[];
}
