import { exec } from 'child_process';
import * as fs from 'fs';
import { ContractFactory, Wallet, ethers } from 'ethers';

export class DilithiumService {
    constructor() {}

    convertCoeffs(coeffs: number[]): string {
        let newCoeffs = [];
        newCoeffs = coeffs
        newCoeffs[0] = `int32(${newCoeffs[0]})`
        let text = `[${newCoeffs.toString()}]`
        return text
    }

    async buildContract() {
        // copy file
        fs.copyFileSync('src/modules/dilithium/contracts/publicKey.template.sol', 'src/modules/dilithium/contracts/publicKey.sol');
        const jsonKey = JSON.parse(fs.readFileSync('src/modules/dilithium/contracts/key.json', 'utf8'));
        const solidity = fs.readFileSync('src/modules/dilithium/contracts/publicKey.sol', 'utf8');
        const packedBuffer = Buffer.from(jsonKey.packed);
        let newSolidity = solidity.replace("{%%packed%%}", packedBuffer.toString('hex'));
        // write t1
        for (let i = 0; i < jsonKey.t1.vec.length; i++) {
            const newCoeffs = this.convertCoeffs(jsonKey.t1.vec[i].coeffs)
            newSolidity = newSolidity.replace(`{%%t1.vec[${i}]%%}`, newCoeffs);
        }
        // write mat
        for (let i = 0; i < jsonKey.mat.length; i++) {
            for (let j = 0; j < jsonKey.mat[i].vec.length; j++) {
                const newCoeffs = this.convertCoeffs(jsonKey.mat[i].vec[j].coeffs)
                newSolidity = newSolidity.replace(`{%%mat${i}.vec[${j}]%%}`, newCoeffs);
            }
        }
        fs.writeFileSync('src/modules/dilithium/contracts/publicKey.sol', newSolidity);
        fs.copyFileSync('src/modules/dilithium/contracts/publicKey.sol', '../contracts/src/publicKey.sol');
        fs.rmSync('../contracts/out/publicKey.sol', { recursive: true, force: true });
        exec("forge build", { cwd: '../contracts'}, (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log('done')
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            fs.rmSync('src/modules/dilithium/contracts/publicKey.sol');
            // fs.rmSync('../contracts/src/publicKey.sol');
        });
    }

    async deployPolyVecContract(abiPath: string) {
        const info = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        const provider = new ethers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc')
        const wallet = new Wallet('0x823040ded853732e9ce72c2c3aecb6e6ffcfb5a53b9b614cb46427d532150f37', provider)
        const result = await new ContractFactory(info.abi, info.bytecode).connect(wallet).deploy()
        await result.waitForDeployment()
        return result
    }

    async deployPublicKey(abiPath: string, address0: string, address1: string, address2: string, address3: string) {
        const info = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        const provider = new ethers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc')
        const wallet = new Wallet('0x823040ded853732e9ce72c2c3aecb6e6ffcfb5a53b9b614cb46427d532150f37', provider)
        const result = await new ContractFactory(info.abi, info.bytecode).connect(wallet).deploy(address0, address1, address2, address3)
        await result.waitForDeployment()
        return result
    }

    async deployPublicKey2(abiPath: string) {
        const info = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        const provider = new ethers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc')
        const wallet = new Wallet('0x823040ded853732e9ce72c2c3aecb6e6ffcfb5a53b9b614cb46427d532150f37', provider)
        const result = await new ContractFactory(info.abi, info.bytecode).connect(wallet).deploy()
        await result.waitForDeployment()
        return result
    }

    async readPublicKey(abiPath: string, address: string) {
        const info = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
        const provider = new ethers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc')
        const contract = new ethers.Contract(address, info.abi, provider)
        const aaa = await contract.expandedPublicKey()
        console.log(aaa)
    }

    async deployContract() {
        // const abiMat0Path = '../contracts/out/publicKeyMat0.sol/DilithiumPublicKeyMat0.json'
        // const result0 = await this.deployPolyVecContract(abiMat0Path)
        // const address0 = await result0.getAddress()
        // const abiMat1Path = '../contracts/out/publicKeyMat1.sol/DilithiumPublicKeyMat1.json'
        // const result1 = await this.deployPolyVecContract(abiMat1Path)
        // const address1 = await result1.getAddress()
        // const abiMat2Path = '../contracts/out/publicKeyMat2.sol/DilithiumPublicKeyMat2.json'
        // const result2 = await this.deployPolyVecContract(abiMat2Path)
        // const address2 = await result2.getAddress()
        // const abiMat3Path = '../contracts/out/publicKeyMat3.sol/DilithiumPublicKeyMat3.json'
        // const result3 = await this.deployPolyVecContract(abiMat3Path)
        // const address3 = await result3.getAddress()
        // //deploy public Key
        // const abiPath = '../contracts/out/publicKey2.sol/DilithiumPublicKey.json'
        // const result = await this.deployPublicKey(abiPath, address0, address1, address2, address3)
        // await this.readPublicKey(abiPath, await result.getAddress())
        const abiPath = '../contracts/out/publicKey.sol/DilithiumPublicKey.json'
        const result = await this.deployPublicKey2(abiPath)
        await this.readPublicKey(abiPath, await result.getAddress())
    }
}