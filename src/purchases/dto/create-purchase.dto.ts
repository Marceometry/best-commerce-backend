import { IsNumber, IsUUID } from 'class-validator';

export class CreatePurchaseDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  amount: number;
}
