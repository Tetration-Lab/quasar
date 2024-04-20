import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common'
import { DilithiumService } from './dilithium.service';
import { ExpandedPublicKeyDto } from './dto/pubkey.dto';

@Controller('dilithium')
export class DilithiumController {
  constructor(
    private readonly dilithiumService: DilithiumService
  ) {}

  @Post('createAccount')
  async createAccount(@Body() dto: ExpandedPublicKeyDto) {
    this.dilithiumService.buildPublicKeyContract(dto);
    const address = await this.dilithiumService.deployPublicKey();
    return address
    // const result = await this.dilithiumService.buildContract();
    // return result
  }
}