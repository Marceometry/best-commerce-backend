import { IsUUID } from 'class-validator';

export class CreatePurchaseDto {
  @IsUUID()
  productId: string;
}
