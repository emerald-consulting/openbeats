import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import RequestWithUser from '../auth/requestWithUser.interface';
import { SearchService } from './search.service';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('search')
@Controller('search')
@UseInterceptors(ClassSerializerInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  /* Search for user endpoints */
  @Get('/users/email/:email')
  searchUserByEmail(@Param('email') email: string) {
    return this.searchService.searchUserByEmail(email);
  }

  @Get('/users/username/:username')
  searchUserByUsername(@Param('username') username: string) {
    return this.searchService.searchUserByUsername(username);
  }
}
