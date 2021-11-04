import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { FindOneParams } from '../utils/exceptionsLogger.filter';
import CreatePostDto from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import PostsService from './posts.service';

@ApiTags('posts')
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Patch(':id')
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(Number(id));
  }
}
