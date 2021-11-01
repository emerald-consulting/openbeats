import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Logger,
} from '@nestjs/common';
import JwtAuthGuard from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private logger: Logger) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    this.logger.log(`Getting authenticated user: ${req.user}`);
    return this.authService.getAuthenticatedUser(req.user, req.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    this.logger.log(`Getting ${req.user.firstName}'s profile`);
    return req.user;
  }
}
