import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { buildSuccessResponse } from '../common/utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return buildSuccessResponse(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: CurrentUserPayload) {
    const userData = await this.authService.validateUser(user.sub);
    return buildSuccessResponse({ user: userData });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return buildSuccessResponse({ message: 'Logged out successfully' });
  }
}

