import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthGuard } from './local-auth.guard';
import JwtauthGuard from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.userId);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtauthGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtauthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
