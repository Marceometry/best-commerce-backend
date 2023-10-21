import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class CreateProductCategoryDto {
  @ApiProperty()
  @IsString()
  id?: string;

  @ApiProperty()
  @IsString()
  name?: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty()
  category?: CreateProductCategoryDto;
}
