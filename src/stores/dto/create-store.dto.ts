import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  address?: Address;
}
