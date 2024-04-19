// // SPDX-License-Identifier: GPL-3.0
// pragma solidity ^0.8.23;

// import {Test, console} from "forge-std/Test.sol";
// import {QuasarAccount, IEntryPoint, PackedUserOperation} from "../src/QuasarAccount.sol";
// import {EntryPoint} from "../src/core/EntryPoint.sol";
// import {TestERC20, IERC20} from "./utils/TestERC20.sol";
// contract VotingEscrowTest is Test {

//     QuasarAccount account;
//     IEntryPoint entryPoint;
//     TestERC20 testToken;

//     function setUp() public {
//         entryPoint = new EntryPoint();
//         account = new QuasarAccount(entryPoint);
//         testToken = new TestERC20("Quantum Safe Token", "QST");
//     }

//     function testAA() public {
//         assertEq(testToken.balanceOf(address(account)), 0);
//         uint256 nonce = account.getNonce();
//         bytes memory tokenCalldata = abi.encodeWithSignature(
//             "mint(address,uint256)",
//             address(account),
//             1000e18
//         );
//         bytes memory signature = "";
//         bytes memory publicKeys = "";
//         vm.prank(address(entryPoint));
//         account.execute(address(testToken), 0, tokenCalldata, signature, publicKeys);
//         vm.stopPrank();
//         assertEq(testToken.balanceOf(address(account)), 1000e18);
//     }
// }