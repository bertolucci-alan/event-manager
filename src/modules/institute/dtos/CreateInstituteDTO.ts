import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstituteDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  CNPJ: string;
}
