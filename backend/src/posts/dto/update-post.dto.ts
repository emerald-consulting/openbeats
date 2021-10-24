import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNumber()
  @IsOptional()
  postId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  text: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
