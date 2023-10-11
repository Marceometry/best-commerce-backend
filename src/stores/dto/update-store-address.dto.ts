import { IsString } from 'class-validator';

export class UpdateStoreAddressDto {
  @IsString()
  number?: string;

  @IsString()
  street?: string;

  @IsString()
  neighborhood?: string;

  @IsString()
  complement?: string;

  @IsString()
  city?: string;

  @IsString()
  state?: string;

  @IsString()
  country?: string;

  @IsString()
  zipCode?: string;
}
