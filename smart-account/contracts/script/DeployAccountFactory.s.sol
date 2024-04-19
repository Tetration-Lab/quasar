// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SimpleQuasarAccountFactory} from "../src/SimpleQuasarAccountFactory.sol";

contract AccountFactoryDeployer is Script {
    function setUp() public {}

    function run() public {
        // console.log(vm.envUint("PRIVATE_KEY"));
        // uint256 deployPrivateKey = uint256(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80);
        vm.startBroadcast();
        SimpleQuasarAccountFactory factory = new SimpleQuasarAccountFactory();
        console.log("SimpleQuasarAccountFactory deployed at: ", address(factory));
        vm.stopBroadcast();
    }
}
