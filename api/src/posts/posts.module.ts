import { Module } from '@nestjs/common';
//import PostsController from './posts.controller';
//import PostsService from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './entities/post.entity';
import { FilesModule } from 'src/files/files.module';
import { Repository } from 'typeorm';
import PublicFile from 'src/files/publicFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), FilesModule, Repository<PublicFile>],
  controllers: [],
  providers: [],
})
export class PostsModule {}
