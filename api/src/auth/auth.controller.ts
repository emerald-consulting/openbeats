import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthGuard } from './local-auth.guard';
import JwtAuthGuard from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import JwtRefreshGuard from './jwt-refresh.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      request.user.email,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.email,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.email);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user.isActive;
  }
}
