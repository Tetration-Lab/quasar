// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import "../src/SimpleQuasarAccountFactory.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "@tetrationlab/dilithium/contract/Dilithium.sol";
import "@tetrationlab/dilithium/contract/Invntt.sol";
import "@tetrationlab/dilithium/contract/Ntt.sol";
import "@tetrationlab/dilithium/contract/Poly.sol";
import "@tetrationlab/dilithium/contract/PolyVec.sol";
import "@tetrationlab/dilithium/contract/Packing.sol";

contract AccountFactoryDeployer is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        bytes32 salt = bytes32(0x0);

        // Deploy Dilithium
        Ntt ntt = Ntt(Create2.deploy(0, salt, type(Ntt).creationCode));
        Invntt invntt = Invntt(Create2.deploy(0, salt, type(Invntt).creationCode));
        Polynomial poly =
            Polynomial(Create2.deploy(0, salt, abi.encodePacked(type(Polynomial).creationCode, abi.encode(ntt))));
        PolynomialVector polyVec = PolynomialVector(
            Create2.deploy(
                0, salt, abi.encodePacked(type(PolynomialVector).creationCode, abi.encode(ntt, invntt, poly))
            )
        );
        Packing packing =
            Packing(Create2.deploy(0, salt, abi.encodePacked(type(Packing).creationCode, abi.encode(poly))));
        Dilithium dilithium = Dilithium(
            Create2.deploy(0, salt, abi.encodePacked(type(Dilithium).creationCode, abi.encode(poly, polyVec, packing)))
        );

        // Deploy factory
        SimpleQuasarAccountFactory factory = SimpleQuasarAccountFactory(
            Create2.deploy(
                0, salt, abi.encodePacked(type(SimpleQuasarAccountFactory).creationCode, abi.encode(dilithium, packing))
            )
        );

        console.log("Factory address", address(factory));

        vm.stopBroadcast();
    }
}
