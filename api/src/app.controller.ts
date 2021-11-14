import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication/authentication.service';
import JwtAuthenticationGuard from './authentication/jwt-authentication.guard';
import { LocalAuthenticationGuard } from './authentication/localAuthentication.guard';

@Controller()
export class AppController {
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthenticationGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log('auth/login');
    return this.authenticationService.getAuthenticatedUser(req.user, req.password);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Request() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
