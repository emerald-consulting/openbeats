import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  InternalServerErrorException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { FilesService } from '../files/files.service';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { User } from 'src/users/entities/user.entity';
import { access } from 'fs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SearchService {
  constructor(private readonly usersService: UsersService) {}
}
