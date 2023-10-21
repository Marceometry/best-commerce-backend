import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateStoreDto {
  @ApiProperty()
  @IsString()
  name?: string;
}
