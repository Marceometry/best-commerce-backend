import { ApiProperty } from '@nestjs/swagger';
import { Store } from '@prisma/client';

export class StoreDto implements Store {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  addressId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
