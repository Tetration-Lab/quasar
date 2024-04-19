import { Module } from '@nestjs/common'
import { DilithiumService } from './dilithium.service';
import { DilithiumController } from './dilithium.controller';

@Module({
  imports: [
    
  ],
  providers: [DilithiumService],
  controllers: [DilithiumController],
  exports: [DilithiumService],
})
export class DilithiumModule {}