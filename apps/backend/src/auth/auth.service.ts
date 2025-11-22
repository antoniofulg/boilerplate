import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import type { AuthLoginRequest, AuthSessionPayload } from '@shared/contracts';
import { LoggerService } from '../common/logging/logger.service';

/**
 * Auth Service
 * 
 * Handles authentication logic:
 * - Password verification (bcrypt)
 * - Session creation
 * - User lookup
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService
  ) {}

  async login(credentials: AuthLoginRequest): Promise<AuthSessionPayload> {
    const { emailInstitucional, senha } = credentials;

    // Find user by email
    const user = await this.prisma.authUser.findUnique({
      where: { emailInstitucional },
    });

    if (!user) {
      this.logger.warn('Login attempt with invalid email', { emailInstitucional });
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(senha, user.senhaHash);

    if (!isPasswordValid) {
      this.logger.warn('Login attempt with invalid password', { emailInstitucional });
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Create session payload
    const sessionPayload: AuthSessionPayload = {
      userName: user.userName,
      role: user.role as 'Presidente' | 'Secretário' | 'Vereador',
      chamber: user.chamber,
      issuedAt: new Date().toISOString(),
    };

    this.logger.info('Login successful', {
      emailInstitucional,
      userName: user.userName,
    });

    return sessionPayload;
  }
}

