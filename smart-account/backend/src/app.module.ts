import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DilithiumModule } from './modules/dilithium/dilithium.module';

@Module({
  imports: [
    DilithiumModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
