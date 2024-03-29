import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Post Title', description: 'The title of the post' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Post content',
    description: 'The content of the post',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: ['healthy', 'finanzas'],
    description: 'The categories of the post',
  })
  @IsArray()
  categories: [string];

  @ApiProperty({
    example: true,
    description: 'its true if this post is public',
  })
  @IsBoolean()
  isDraft: boolean;
}
