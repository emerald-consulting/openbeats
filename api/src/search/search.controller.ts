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

  @Get('/users/:email')
  searchUserByEmail(@Param('email') email: string) {
    return this.searchService.searchUserByEmail(email);
  }
}
