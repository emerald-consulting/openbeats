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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from '../auth/requestWithUser.interface';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { first } from 'rxjs';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('genre/:genre')
  @UseGuards(JwtAuthGuard)
  async addGenre(
    @Req() request: RequestWithUser,
    @Param('genre') genre: string,
  ) {
    return this.usersService.UpdateGenre(request.user.id, genre);
  }

  @Patch('bio/:bio')
  @UseGuards(JwtAuthGuard)
  async addBio(@Req() request: RequestWithUser, @Param('bio') bio: string) {
    return this.usersService.UpdateBio(request.user.id, bio);
  }

  @Patch('company/:company')
  @UseGuards(JwtAuthGuard)
  async addCompany(
    @Req() request: RequestWithUser,
    @Param('company') company: string,
  ) {
    return this.usersService.UpdateCompany(request.user.id, company);
  }

  @Patch('firstName/:firstName')
  @UseGuards(JwtAuthGuard)
  async addFName(
    @Req() request: RequestWithUser,
    @Param('firstName') firstName: string,
  ) {
    return this.usersService.Updatefname(request.user.id, firstName);
  }

  @Patch('lastName/:lastName')
  @UseGuards(JwtAuthGuard)
  async addlName(
    @Req() request: RequestWithUser,
    @Param('lastName') lastName: string,
  ) {
    return this.usersService.Updatelname(request.user.id, lastName);
  }

  @Patch('age/:age')
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
    return this.usersService.addAvatar(request.user.email, file);
  }

  @Delete('avatar')
  @UseGuards(JwtAuthGuard)
  async deleteAvatar(@Req() request: RequestWithUser) {
    return this.usersService.deleteAvatar(request.user.id);
  }

  @Post('create')
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
