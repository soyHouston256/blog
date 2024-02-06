import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Fermin', description: 'User Name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'fermi', description: 'User Nickname' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 'acosta rosa', description: 'User lastName' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'fermi@gmail.com', description: 'User Email' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'password', description: 'User Password' })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'true', description: 'User its admin' })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @ApiProperty({ example: 'admin', description: 'User Role' })
  @IsString()
  @IsOptional()
  role: string;
}
