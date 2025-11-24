import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import cookie from '@fastify/cookie';
import { getFeatureFlag } from '@shared/config/featureFlags';
import { PerfInterceptor } from './common/observability/perf.interceptor';
import { LoggerService } from './common/logging/logger.service';

/**
 * Bootstrap NestJS application with Fastify
 * 
 * Features:
 * - Global validation pipes (Zod schemas)
 * - Rate limiting
 * - Security headers (Helmet)
 * - CORS configuration
 */
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );

  // Cookie support
  await app.register(cookie);

  // Security: Helmet for HTTP headers
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  // Rate limiting
  await app.register(rateLimit, {
    max: 100, // requests
    timeWindow: '1 minute',
  });

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Global validation pipe (uses Zod schemas via ValidationPipe)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Performance monitoring interceptor
  const loggerService = app.get(LoggerService);
  app.useGlobalInterceptors(new PerfInterceptor(loggerService));

  // Log feature flags status
  const staticDashboardEnabled = getFeatureFlag('staticDashboardMvp');
  console.log(`📊 Feature Flags: staticDashboardMvp=${staticDashboardEnabled}`);

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend server running on http://0.0.0.0:${port}`);
}

bootstrap();

