import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import JwtAuthGuard from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private logger: Logger) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    this.logger.debug(`Getting authenticated user: ${req.user}`);
    return this.authService.getAuthenticatedUser(req.user, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    this.logger.log(`Getting ${req.user.firstName}'s profile`);
    return req.user;
  }

  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    this.logger.log(`Facebook`);
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Request() req): Promise<any> {
    this.logger.log(`Returnin ${req.user}`);
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
