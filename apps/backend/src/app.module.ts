import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { LoggerService } from './common/logging/logger.service';

/**
 * Root Application Module
 * Wires all feature modules together
 */
@Module({
  imports: [ConfigModule, PrismaModule, AuthModule, DashboardModule],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}

