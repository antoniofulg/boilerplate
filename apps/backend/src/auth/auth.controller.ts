import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';
import { AuthService } from './auth.service';
import { AuthLoginRequestSchema, type AuthLoginRequest } from '../common/zod/contracts';
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
    @Res() res: FastifyReply
  ) {
    // Validate request body using Zod schema
    const validatedData = AuthLoginRequestSchema.parse(body);

    // Authenticate user
    const sessionPayload = await this.authService.login(validatedData);

    // Set HTTP-only secure cookie
    const cookieName = 'smartvoto_session';
    const cookieValue = JSON.stringify(sessionPayload);
    const isProduction = this.config.isProduction;

    // Fastify setCookie method (available when @fastify/cookie is registered)
    // Type assertion needed because TypeScript doesn't recognize the plugin types
    (res as FastifyReply & { setCookie: (name: string, value: string, options?: FastifyCookieOptions) => void })
      .setCookie(cookieName, cookieValue, {
        httpOnly: true, // XSS protection
        secure: isProduction, // HTTPS only in production
        sameSite: 'strict', // CSRF protection
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

    return res.send(sessionPayload);
  }
}
