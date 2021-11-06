import { Module } from '@nestjs/common';
//import PostsController from './posts.controller';
//import PostsService from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './entities/post.entity';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import PostsController from './posts.controller';
import PostsService from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), FilesModule],
  controllers: [PostsController],
  providers: [PostsService, FilesService],
  exports: [PostsService],
})
export class PostsModule {}
