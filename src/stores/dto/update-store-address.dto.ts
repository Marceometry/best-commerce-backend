import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateStoreAddressDto {
  @ApiProperty()
  @IsString()
  number?: string;

  @ApiProperty()
  @IsString()
  street?: string;

  @ApiProperty()
  @IsString()
  neighborhood?: string;

  @ApiProperty()
  @IsString()
  complement?: string;

  @ApiProperty()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsString()
  state?: string;

  @ApiProperty()
  @IsString()
  country?: string;

  @ApiProperty()
  @IsString()
  zipCode?: string;
}
