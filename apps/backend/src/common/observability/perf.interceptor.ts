import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logging/logger.service';

/**
 * Performance Interceptor
 * 
 * Tracks request duration and logs metrics for p95 latency tracking
 * Specifically monitors /auth/login endpoint for performance targets
 */
@Injectable()
export class PerfInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        const durationMs = duration;

        // Log performance metrics
        this.logger.info('Request completed', {
          method,
          url,
          durationMs,
          requestId: request.id || 'unknown',
        });

        // Alert if /auth/login exceeds p95 target (300ms)
        if (url === '/auth/login' && durationMs > 300) {
          this.logger.warn('Auth login exceeded p95 target', {
            method,
            url,
            durationMs,
            threshold: 300,
          });
        }
      })
    );
  }
}

