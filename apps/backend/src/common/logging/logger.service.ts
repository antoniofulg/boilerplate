import { Injectable, Logger } from '@nestjs/common';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export type LogContext = {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  [key: string]: unknown;
};

/**
 * Structured Logger Service
 * 
 * Provides structured logging with context for observability
 */
@Injectable()
export class LoggerService {
  private readonly logger = new Logger();

  log(level: LogLevel, message: string, context?: LogContext) {
    const structuredLog = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...context,
    };

    switch (level) {
      case 'info':
        this.logger.log(JSON.stringify(structuredLog));
        break;
      case 'warn':
        this.logger.warn(JSON.stringify(structuredLog));
        break;
      case 'error':
        this.logger.error(JSON.stringify(structuredLog));
        break;
      case 'debug':
        this.logger.debug(JSON.stringify(structuredLog));
        break;
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext) {
    this.log('error', message, context);
  }

  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }
}

