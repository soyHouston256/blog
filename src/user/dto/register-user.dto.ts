import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

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

  @IsBoolean()
  isAdmin: boolean;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
