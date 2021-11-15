import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { PublicFile } from 'src/files/entities/file.entity';

export class CreatePostDto {
  /* Title is required */
  @IsString()
  @IsNotEmpty()
  title: string;

  author: User;

  @IsString()
  description?: string;

  /* File ID previously retrieved from uploading a file */
  fileid?: number;
}

export default CreatePostDto;
