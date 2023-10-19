import { IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
