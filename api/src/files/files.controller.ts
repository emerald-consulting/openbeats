import {
  Controller,
  Get,
  Post,
  Res,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from 'src/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@ApiTags('files')
@Controller('files')
//@UseInterceptors(ClassSerializerInterceptor)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPublicFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadPublicFile(file.buffer, file.originalname);
  }

  @Get('download/:id')
  async downloadPublicFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.filesService.downloadPublicFile(id);
    file.pipe(res);
  }
}
