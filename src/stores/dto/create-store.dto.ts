import { Address } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  name: string;

  address?: Address;
}
