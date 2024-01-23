import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  categories: [string];

  @IsBoolean()
  isDraft: boolean;
}

export class UpdatePostsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @IsOptional()
  categories?: [string];

  @IsBoolean()
  @IsOptional()
  isDraft: boolean;
}
