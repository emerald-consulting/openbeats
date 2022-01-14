import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  InternalServerErrorException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, Like } from 'typeorm';
import { FilesService } from '../files/files.service';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { access } from 'fs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  /* Search users */
  async searchUserByEmail(query: string) {
    const results = await this.usersRepository.find({
      email: Like(`%${query}%`),
    });
    if (results) {
      return results;
    }
    return new HttpException('No matches found', HttpStatus.NOT_FOUND);
  }

  async searchUserByUsername(query: string) {
    const results = await this.usersRepository.find({
      username: Like(`%${query}%`),
    });
    if (results) {
      return results;
    }
    return new HttpException('No matches found', HttpStatus.NOT_FOUND);
  }

  /* Search posts */
  async searchPostByTitle(query: string) {
    const results = await this.postsRepository.find({
      title: Like(`%${query}%`),
    });
    if (results) {
      return results;
    }
    return new HttpException('No matches found', HttpStatus.NOT_FOUND);
  }
}
