import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

/**
 * Config Module (Global)
 * 
 * Provides environment configuration to all modules
 */
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

