import { execSync } from 'child_process';
import * as fs from 'fs';
import { ContractFactory, JsonRpcProvider, Wallet, ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { ExpandedPublicKeyDto } from './dto/pubkey.dto';

@Injectable()
export class DilithiumService {
    contractRootPath: string;
    privateKey: string;
    arbitrumRpc: string;
    arbitrumFactory: string;
    ethRpc: string;
    ethFactory: string;
    gnosisRpc: string;
    gnosisFactory: string;
    availRpc: string;
    availFactory: string;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.privateKey = this.configService.get('privateKey');
        this.contractRootPath = this.configService.get('contractRootPath');
        this.arbitrumRpc = this.configService.get('arbitrum.rpc');
        this.arbitrumFactory = this.configService.get('arbitrum.factory');
        this.ethRpc = this.configService.get('eth.rpc');
        this.ethFactory = this.configService.get('eth.factory');
        this.gnosisRpc = this.configService.get('gnosis.rpc');
        this.gnosisFactory = this.configService.get('gnosis.factory');
        this.availRpc = this.configService.get('avail.rpc');
        this.availFactory = this.configService.get('avail.factory');
    }

    convertCoeffs(coeffs: number[]): string {
        let newCoeffs = [];
        newCoeffs = coeffs
        newCoeffs[0] = `int32(${newCoeffs[0]})`
        let text = `${newCoeffs.toString()}`
        return text
    }

    buildPublicKeyContract(dto: ExpandedPublicKeyDto) {
        // copy file
        fs.copyFileSync('src/modules/dilithium/contracts/publicKey.template.sol', 'src/modules/dilithium/contracts/publicKey.sol');
        const solidity = fs.readFileSync('src/modules/dilithium/contracts/publicKey.sol', 'utf8');
        const packedBuffer = Buffer.from(dto.packed);
        let newSolidity = solidity.replace("{%%packed%%}", packedBuffer.toString('hex'));
        // write t1
        for (let i = 0; i < dto.t1.vec.length; i++) {
            const newCoeffs = this.convertCoeffs(dto.t1.vec[i].coeffs)
            newSolidity = newSolidity.replace(`{%%t1.polys${i}%%}`, newCoeffs);
        }
        // write mat
        for (let i = 0; i < dto.mat.length; i++) {
            for (let j = 0; j < dto.mat[i].vec.length; j++) {
                const newCoeffs = this.convertCoeffs(dto.mat[i].vec[j].coeffs)
                newSolidity = newSolidity.replace(`{%%mat${i}.polys${j}%%}`, newCoeffs);
            }
        }
        fs.writeFileSync('src/modules/dilithium/contracts/publicKey.sol', newSolidity);
        fs.copyFileSync('src/modules/dilithium/contracts/publicKey.sol', path.join(this.contractRootPath, 'src/publicKey.sol'));
        fs.rmSync(path.join(this.contractRootPath, 'out/publicKey.sol'), { recursive: true, force: true });
        try {
            execSync("forge build", { cwd: this.contractRootPath });
            fs.rmSync('src/modules/dilithium/contracts/publicKey.sol');
            fs.rmSync(path.join(this.contractRootPath, '/src/publicKey.sol'));
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    async deployContract(abiPath: string, provider: JsonRpcProvider, args = []) {
        const info = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        const wallet = new Wallet(this.privateKey, provider)
        let result
        if (args.length > 0) {
            result = await new ContractFactory(info.abi, info.bytecode).connect(wallet).deploy(...args)
        } else {
            result = await new ContractFactory(info.abi, info.bytecode).connect(wallet).deploy()
        }
        await result.waitForDeployment()
        return result
    }

    getProvider(chainId: number) {
        let rpcUrl;
        if (chainId == 421614) {
            // arbitrum
            rpcUrl = this.arbitrumRpc
        } else if (chainId == 11155111) {
            // eth
            rpcUrl = this.ethRpc
        } else if (chainId == 202402021700) {
            // avail
            rpcUrl = this.availRpc
        } else if (chainId == 10200) {
            // gnosis
            rpcUrl = this.gnosisRpc
        }
        return new ethers.JsonRpcProvider(rpcUrl)
    }

    getFactory(chainId: number, wallet) {
        const abi = fs.readFileSync(path.join(this.contractRootPath, 'out/SimpleQuasarAccountFactory.sol/SimpleQuasarAccountFactory.json'), 'utf8');
        let factoryAddress;
        if (chainId == 421614) {
            factoryAddress = this.arbitrumFactory
        } else if (chainId == 11155111) {
            // eth
            factoryAddress = this.ethFactory
        } else if (chainId == 202402021700) {
            // avail
            factoryAddress = this.availFactory
        } else if (chainId == 10200) {
            // gnosis
            factoryAddress = this.gnosisFactory
        }
        return new ethers.Contract(factoryAddress, JSON.parse(abi).abi, wallet)
    }

    async deployPublicKey(chainId: number) {
        const provider = this.getProvider(chainId)
        //deploy public Key
        const t1Path = path.join(this.contractRootPath, 'out/publicKey.sol/PKT1.json')
        const t1Result = await this.deployContract(t1Path, provider)
        const t1Address = await t1Result.getAddress()
        const mat0Path = path.join(this.contractRootPath, 'out/publicKey.sol/PKMAT0.json')
        const mat0Result = await this.deployContract(mat0Path, provider)
        const mat0Address = await mat0Result.getAddress()
        const mat1Path = path.join(this.contractRootPath, 'out/publicKey.sol/PKMAT1.json')
        const mat1Result = await this.deployContract(mat1Path, provider)
        const mat1Address = await mat1Result.getAddress()
        const mat2Path = path.join(this.contractRootPath, 'out/publicKey.sol/PKMAT2.json')
        const mat2Result = await this.deployContract(mat2Path, provider)
        const mat2Address = await mat2Result.getAddress()
        const mat3Path = path.join(this.contractRootPath, 'out/publicKey.sol/PKMAT3.json')
        const mat3Result = await this.deployContract(mat3Path, provider)
        const mat3Address = await mat3Result.getAddress()

        const publicKeyPath = path.join(this.contractRootPath, 'out/publicKey.sol/DilithiumPublicKey.json')
        
        const result = await this.deployContract(publicKeyPath, provider, [mat0Address, mat1Address, mat2Address, mat3Address, t1Address])
        const publicKeyAddress = await result.getAddress();
        return publicKeyAddress
    }

    async createNewAccount(chainId: number, publicKeyAddress: string) {
        console.log(chainId)
        const provider = this.getProvider(chainId);
        console.log(provider)
        const wallet = new Wallet(this.privateKey, provider)
        const factory = this.getFactory(chainId, wallet);
        
        const tx = await factory.createAccount(publicKeyAddress)
        console.log(tx)
        const receipt = await tx.wait()
        console.log(receipt)
        const log = factory.interface.parseLog(receipt.logs[0])
        const accountAddress = log.args[0]
        return accountAddress
    }
}