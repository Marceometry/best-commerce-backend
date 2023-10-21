import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryDto implements Category {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
