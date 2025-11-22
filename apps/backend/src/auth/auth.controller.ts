import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { Response } from 'fastify';
import { AuthService } from './auth.service';
import { AuthLoginRequestSchema, type AuthLoginRequest } from '@shared/contracts';
import { ConfigService } from '../config/config.service';

/**
 * Auth Controller
 * 
 * Handles authentication endpoints:
 * - POST /auth/login: Authenticate user and set HTTP-only secure cookie
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: AuthLoginRequest,
    @Res() res: Response
  ) {
    // Validate request body using Zod schema
    const validatedData = AuthLoginRequestSchema.parse(body);

    // Authenticate user
    const sessionPayload = await this.authService.login(validatedData);

    // Set HTTP-only secure cookie
    const cookieName = 'smartvoto_session';
    const cookieValue = JSON.stringify(sessionPayload);
    const isProduction = this.config.isProduction;

    res.setCookie(cookieName, cookieValue, {
      httpOnly: true, // XSS protection
      secure: isProduction, // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return res.send(sessionPayload);
  }
}
