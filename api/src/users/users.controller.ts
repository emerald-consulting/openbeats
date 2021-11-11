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
  Req,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from '../auth/requestWithUser.interface';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('genre')
  @UseGuards(JwtAuthGuard)
  async addGenre(
    @Req() request: RequestWithUser,
    @Param('genre') genre: string,
  ) {
    return this.usersService.UpdateGenre(request.user.id, genre);
  }

  @Post('bio')
  @UseGuards(JwtAuthGuard)
  async addBio(@Req() request: RequestWithUser, @Param('bio') bio: string) {
    return this.usersService.UpdateBio(request.user.id, bio);
  }

  @Post('company')
  @UseGuards(JwtAuthGuard)
  async addCompany(
    @Req() request: RequestWithUser,
    @Param('company') company: string,
  ) {
    return this.usersService.UpdateCompany(request.user.id, company);
  }

  @Post('url')
  @UseGuards(JwtAuthGuard)
  async addURL(@Req() request: RequestWithUser, @Param('url') url: string) {
    return this.usersService.UpdateURL(request.user.id, url);
  }

  @Post('age')
  @UseGuards(JwtAuthGuard)
  async addAge(@Req() request: RequestWithUser, @Param('age') age: number) {
    return this.usersService.UpdateAge(request.user.id, age);
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(request.user.id, file);
  }

  @Delete('avatar')
  @UseGuards(JwtAuthGuard)
  async deleteAvatar(@Req() request: RequestWithUser) {
    return this.usersService.deleteAvatar(request.user.id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  getUserById(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }

  @Get(':genre')
  getUserByGenre(@Param('genre') genre: string) {
    return this.usersService.getByGenre(genre);
  }

  @Patch(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteUserById(+id);
  }
}
