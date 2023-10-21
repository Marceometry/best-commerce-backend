import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@prisma/client';
import { StoreDto } from './store';

class AddressDto implements Address {
  @ApiProperty()
  id: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  street: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  storeId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class StoreWithAddressDto extends StoreDto {
  @ApiProperty()
  address: AddressDto;
}
