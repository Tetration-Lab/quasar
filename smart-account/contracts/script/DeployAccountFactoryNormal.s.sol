// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/SimpleQuasarAccountFactory.sol";
import "@tetrationlab/dilithium/contract/Dilithium.sol";
import "@tetrationlab/dilithium/contract/Invntt.sol";
import "@tetrationlab/dilithium/contract/Ntt.sol";
import "@tetrationlab/dilithium/contract/Poly.sol";
import "@tetrationlab/dilithium/contract/PolyVec.sol";
import "@tetrationlab/dilithium/contract/Packing.sol";
import "@tetrationlab/dilithium/contract/Symmetric.sol";

contract AccountFactoryDeployer is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        // Deploy Dilithium
        Ntt ntt = new Ntt();
        Invntt invntt = new Invntt();
        Stream stream = new Stream();
        Polynomial poly = new Polynomial(ntt, stream);
        PolynomialVector polyVec = new PolynomialVector(ntt, invntt, poly);
        Packing packing = new Packing(poly);
        Dilithium dilithium = new Dilithium(poly, polyVec, packing);

        // Deploy factory
        SimpleQuasarAccountFactory factory = new SimpleQuasarAccountFactory(dilithium, packing);

        console.log("Factory address", address(factory));

        vm.stopBroadcast();
    }
}
