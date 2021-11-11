import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from 'src/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('files')
@Controller('files')
//@UseInterceptors(ClassSerializerInterceptor)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPublicFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadPublicFile(file);
  }
}
