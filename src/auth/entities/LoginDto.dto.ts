import { IsString } from 'class-validator';

//LoginDto
export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
