import { Injectable } from '@nestjs/common';

/**
 * Configuration Service
 * 
 * Centralized environment variable access with validation
 */
@Injectable()
export class ConfigService {
  get databaseUrl(): string {
    return process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/smartvoto';
  }

  get port(): number {
    return parseInt(process.env.PORT || '3001', 10);
  }

  get frontendUrl(): string {
    return process.env.FRONTEND_URL || 'http://localhost:3000';
  }

  get sessionSecret(): string {
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
      throw new Error('SESSION_SECRET environment variable is required');
    }
    return secret;
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
}

