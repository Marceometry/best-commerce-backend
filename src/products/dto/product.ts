import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductDto implements Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageUrl: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
