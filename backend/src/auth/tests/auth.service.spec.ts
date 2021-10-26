import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../../users/users.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
import mockedConfigService from '../../utils/mocks/config.service';
import { AuthService } from '../auth.service';
import User from '../../users/entities/user.entity';

describe('The AuthenticationService', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
          useValue: {},
        },
      ],
    }).compile();
    authService = await module.get(AuthService);
  });
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(typeof authService.getCookieWithJwtToken(userId)).toEqual(
        'string',
      );
    });
  });
});
