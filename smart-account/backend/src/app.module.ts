import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DilithiumModule } from './modules/dilithium/dilithium.module';
import { ConfigModule } from '@nestjs/config';
import {generalConfig} from './configs/general.config';
import { evmConfig } from './configs/evm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [generalConfig, evmConfig],
      isGlobal: true,
    }),
    DilithiumModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
