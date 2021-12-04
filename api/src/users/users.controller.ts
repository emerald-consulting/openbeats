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
import { FileInterceptor } from '@nestjs/platform-express';
import RequestWithUser from '../auth/requestWithUser.interface';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('avatar')
  // @UseInterceptors(FileInterceptor('file'))
  // async addAvatar(
  //   @Req() request: RequestWithUser,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.usersService.addAvatar(request.user.id, file);
  // }

  @Patch(':id/genre/:genre')
  async addGenre(@Param('id') id: string, @Param('genre') genre: string) {
    return this.usersService.UC(id, 'genre', genre);
  }

  @Patch(':id/bio/:bio')
  async addBio(@Param('id') id: string, @Param('bio') bio: string) {
    return this.usersService.UC(id, 'bio', bio);
  }

  @Patch(':id/age/:age')
  async addAge(@Param('id') id: string, @Param('age') age: string) {
    return this.usersService.UC(id, 'age', age);
  }
  @Patch(':id/FirstName/:FirstName')
  async ModifyFirstName(
    @Param('id') id: string,
    // eslint-disable-next-line prettier/prettier
    @Param('FirstName') FirstName: string,
  ) {
    console.log('still in controller');
    return this.usersService.UpdateName(id, 'given_name', FirstName);
  }
  @Patch(':id/LastName/:LastName')
  async ModifyLastName(
    @Param('id') id: string,
    // eslint-disable-next-line prettier/prettier
    @Param('LastName') LastName: string,
  ) {
    return this.usersService.UpdateName(id, 'family_name', LastName);
  }
  @Get(':id/genre')
  async GetId(@Param('id') id: string) {
    return this.usersService.getProfileDetails(id);
  }
  // @Delete('avatar')
  // async deleteAvatar(@Req() request: RequestWithUser) {
  //   return this.usersService.deleteAvatar(request.user.id);
  // }

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
