import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import {
  RequestOtpDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from './dto/forget-password.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  CurrentUser,
  CurrentUserPayload,
} from '../common/decorators/current-user.decorator';
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

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const result = await this.authService.signup(signupDto);
    return buildSuccessResponse(result);
  }

  @Public()
  @Post('forget-password/request-otp')
  async requestOtp(@Body() requestOtpDto: RequestOtpDto) {
    const result = await this.authService.requestOtp(requestOtpDto);
    return buildSuccessResponse(result);
  }

  @Public()
  @Post('forget-password/verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const result = await this.authService.verifyOtp(verifyOtpDto);
    return buildSuccessResponse(result);
  }

  @Public()
  @Post('forget-password/reset')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(resetPasswordDto);
    return buildSuccessResponse(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return buildSuccessResponse({ message: 'Logged out successfully' });
  }
}
