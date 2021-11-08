import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from 'src/files/files.service';

@ApiTags('files')
@Controller('files')
//@UseInterceptors(ClassSerializerInterceptor)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload')
  async uploadPublicFile(file: Express.Multer.File) {
    return this.filesService.uploadPublicFile(file);
  }
}
