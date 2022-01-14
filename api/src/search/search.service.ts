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
import { access } from 'fs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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

    return new HttpException('No matches found', HttpStatus.NOT_FOUND);
  }
}
