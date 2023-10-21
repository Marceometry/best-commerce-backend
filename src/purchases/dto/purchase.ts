import { ApiProperty } from '@nestjs/swagger';
import { Purchase } from '@prisma/client';

export class PurchaseDto implements Purchase {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
