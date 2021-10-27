import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async create(user: CreateUserDto) {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  findAll() {
    return this.usersRepository.find();
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.findOneById(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching == true) {
      return user;
    }
  }

  async findOneById(userId: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(userId);
    if (user) {
      return user;
    } else {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(email);
    if (user) {
      return user;
    } else {
      throw new HttpException(
        'User was not found in the database.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(username);
    if (user) {
      return user;
    } else {
      throw new HttpException(
        'User was not found in the database.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, user: UpdateUserDto) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOne(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException(
      'User was not found in the database',
      HttpStatus.NOT_FOUND,
    );
  }

  async remove(id: number) {
    const deleteResponse = await this.usersRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
