import { IsUUID, IsNumber, IsString, IsDate, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
