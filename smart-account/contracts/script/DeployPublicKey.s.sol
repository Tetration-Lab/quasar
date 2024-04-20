// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {DilithiumPublicKey} from "../src/publicKey2.sol";
import {DilithiumPublicKeyMat0} from "../src/publicKeyMat0.sol";
import {DilithiumPublicKeyMat1} from "../src/publicKeyMat1.sol";
import {DilithiumPublicKeyMat2} from "../src/publicKeyMat2.sol";
import {DilithiumPublicKeyMat3} from "../src/publicKeyMat3.sol";

contract PublicKeyDeployer is Script {
    function setUp() public {}

    function run() public {
        // console.log(vm.envUint("PRIVATE_KEY"));
        // uint256 deployPrivateKey = uint256(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);
        vm.startBroadcast();
        DilithiumPublicKeyMat0 mat0 = new DilithiumPublicKeyMat0();
        console.log("DilithiumPublicKeyMat0 deployed at: ", address(mat0));
        DilithiumPublicKeyMat1 mat1 = new DilithiumPublicKeyMat1();
        console.log("DilithiumPublicKeyMat1 deployed at: ", address(mat1));
        DilithiumPublicKeyMat2 mat2 = new DilithiumPublicKeyMat2();
        console.log("DilithiumPublicKeyMat2 deployed at: ", address(mat2));
        DilithiumPublicKeyMat3 mat3 = new DilithiumPublicKeyMat3();
        console.log("DilithiumPublicKeyMat3 deployed at: ", address(mat3));
        DilithiumPublicKey publicKey = new DilithiumPublicKey(address(mat0), address(mat1), address(mat2), address(mat3));
        console.log("DilithiumPublicKey deployed at: ", address(publicKey));
        vm.stopBroadcast();
    }
}
