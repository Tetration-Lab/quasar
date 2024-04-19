import { exec } from 'child_process';
import * as fs from 'fs';

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
            fs.rmSync('../contracts/src/publicKey.sol');
        });
    }
}