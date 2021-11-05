import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  /* Title is required */
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  /* Uploading a file is optional */
  file?: Express.Multer.File;
}

export default CreatePostDto;
