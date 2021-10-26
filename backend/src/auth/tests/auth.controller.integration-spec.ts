import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../../users/users.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
import mockedConfigService from '../../utils/mocks/config.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import User from '../../users/entities/user.entity';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import mockedUser from './user.mock';

describe('The AuthController', () => {
  let app: INestApplication;
  let userData: User;
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    const usersRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
    };

    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        UsersService,
        AuthService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  describe('when registering', () => {
    describe('and using valid data', () => {
      it('should respond with the data of the user without the password', () => {
        const expectedData = {
          ...userData,
        };
        delete expectedData.password;
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            email: mockedUser.email,
            firstName: mockedUser.firstName,
            lastName: mockedUser.lastName,
            password: 'strongPassword',
          })
          .expect(201)
          .expect(expectedData);
      });
    });
    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            firstName: mockedUser.firstName,
          })
          .expect(400);
      });
    });
  });
});
