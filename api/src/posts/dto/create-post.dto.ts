import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreatePostDto {
  /* Title is required */
  @IsString()
  @IsNotEmpty()
  title: string;

  author: User;

  @IsString()
  description?: string;

  // /* Uploading a file is optional */
  // file?: Express.Multer.File;
  fileUrl?: string;

  // pubfile?: PublicFile;
}

export default CreatePostDto;
