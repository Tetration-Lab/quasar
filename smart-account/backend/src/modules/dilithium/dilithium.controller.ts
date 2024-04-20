import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { DilithiumService } from './dilithium.service';
import { ExpandedPublicKeyDto } from './dto/pubkey.dto';

@Controller('dilithium')
export class DilithiumController {
  constructor(
    private readonly dilithiumService: DilithiumService
  ) {}

  @Post('createAccount/:chainId')
  async createAccount(@Body() dto: ExpandedPublicKeyDto, @Param('chainId') chainId: number){
    this.dilithiumService.buildPublicKeyContract(dto)
    console.log('deploying')
    const publicKeyAddress = await this.dilithiumService.deployPublicKey(Number(chainId))
    // create new account
    const account = await this.dilithiumService.createNewAccount(Number(chainId),publicKeyAddress)
    return {
        publicKeyAddress: publicKeyAddress,
        accountAddress: account
    }
  }
}