import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Fermin', description: 'User Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'fermi', description: 'User Nickname' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'acosta rosa', description: 'User lastName' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'fermi@gmail.com', description: 'User Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'User Password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'true', description: 'User its admin' })
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({ example: 'admin', description: 'User Role' })
  @IsString()
  role: string;
}
