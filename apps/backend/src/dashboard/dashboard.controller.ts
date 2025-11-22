import { Controller, Get, UseGuards, UnauthorizedException, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { DashboardService } from './dashboard.service';
import type { AuthSessionPayload } from '@shared/contracts';

/**
 * Session Guard
 * 
 * Validates HTTP-only secure cookie for authenticated requests
 */
function getSessionFromCookie(req: FastifyRequest): AuthSessionPayload | null {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const sessionCookie = cookies['smartvoto_session'];
  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(sessionCookie)) as AuthSessionPayload;
  } catch {
    return null;
  }
}

/**
 * Dashboard Controller
 * 
 * Handles dashboard snapshot endpoint:
 * - GET /dashboard/snapshot: Returns static dashboard data (requires authentication)
 */
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('snapshot')
  async getSnapshot(@Req() req: FastifyRequest) {
    // Check for session cookie
    const session = getSessionFromCookie(req);

    if (!session) {
      throw new UnauthorizedException('Session required');
    }

    // Return dashboard snapshot
    return this.dashboardService.getSnapshot();
  }
}
