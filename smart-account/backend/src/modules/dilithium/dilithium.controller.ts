import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common'
import { DilithiumService } from './dilithium.service';

@Controller('dilithium')
export class DilithiumController {
  constructor(
    private readonly dilithiumService: DilithiumService
  ) {}

  @Get()
  async test() {
    this.dilithiumService.buildContract();
    // await this.dilithiumService.deployContract();
  }
}