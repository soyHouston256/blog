import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

//LoginDto
export class LoginDto {
  @ApiProperty({
    example: 'houston@gmail.com',
    description: 'The email of the user',
  })
  @IsString()
  email: string;
  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  @IsString()
  password: string;
}
