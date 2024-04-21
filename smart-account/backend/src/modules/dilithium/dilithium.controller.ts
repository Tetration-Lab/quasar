import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common'
import { DilithiumService } from './dilithium.service';
import { ExpandedPublicKeyDto } from './dto/pubkey.dto';
import { ExecuteDto } from './dto/execute.dto';

@Controller('dilithium')
export class DilithiumController {
  constructor(
    private readonly dilithiumService: DilithiumService
  ) {}

  @Post('createAccount/:chainId')
  async createAccount(@Body() dto: ExpandedPublicKeyDto, @Param('chainId') chainId: number){
    console.time('build')
    this.dilithiumService.buildPublicKeyContract(dto)
    console.timeEnd('build')
    console.time('deploy')
    const publicKeyAddress = await this.dilithiumService.deployPublicKey(Number(chainId))
    console.log(publicKeyAddress)
    console.timeEnd('deploy')
    // create new account
    console.time('createAccount')
    const account = await this.dilithiumService.createNewAccount(Number(chainId),publicKeyAddress)
    console.timeEnd('createAccount')
    return {
        publicKeyAddress: publicKeyAddress,
        accountAddress: account
    }
  }

  @Post('execute/:chainId')
  async execute(@Body() dto: ExecuteDto, @Param('chainId') chainId: number){
    const receipt = await this.dilithiumService.execute(Number(chainId), dto)
    return receipt
  }

  @Get('publicKey/:chainId/:address')
  async getPublicKey(@Param('chainId') chainId: number, @Param('address') address: string){
    return await this.dilithiumService.readPublicKey(Number(chainId), address)
  }
}