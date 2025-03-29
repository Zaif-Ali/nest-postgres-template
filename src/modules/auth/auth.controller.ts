import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUp.dto';
import { SignInDto } from './dto/SignIn.dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  private readonly logger =new Logger(AuthController.name, { timestamp: true });
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(201)
  async signup(@Body() signUpData: SignUpDto) {
    return await this.authService.signUp(signUpData);
  }

  @Post('sign-in')
  async signin(@Body() signInData: SignInDto) {
    return await this.authService.signIn(signInData);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    await this.authService.logout(req.user?.['sub'] as string);
    return { message: 'Logged out successfully' };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request) {
    const userId = req.user?.['sub'] as string;
    const refreshToken = req.user?.['refreshToken'] as string;
    let token: null | { accessToken: string; refreshToken: string };
    try {
      token = await this.authService.refreshTokens(userId, refreshToken);
    } catch (error) {
      this.logger.error(`Failed to refresh tokens: ${error}`);
      throw new BadRequestException('Invalid refresh token');
    }
    return { tokens: token };
  }
}
