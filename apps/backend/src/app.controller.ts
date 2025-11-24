import { Controller, Get } from '@nestjs/common';

/**
 * App Controller
 * 
 * Basic health check endpoint
 */
@Controller()
export class AppController {
  @Get('health')
  health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}

