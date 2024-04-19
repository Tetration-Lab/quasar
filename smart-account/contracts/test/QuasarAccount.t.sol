// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import {Test, console} from "forge-std/Test.sol";
import {QuasarAccount, IEntryPoint, PackedUserOperation} from "../src/QuasarAccount.sol";
import {EntryPoint} from "../src/core/EntryPoint.sol";
contract VotingEscrowTest is Test {

    QuasarAccount account;
    IEntryPoint entryPoint;

    // function _setupUserOp(
    //     uint256 _signerPKey,
    //     bytes memory _initCode,
    //     bytes memory _callDataForEntrypoint
    // ) internal returns (UserOperation[] memory ops) {
    //     uint256 nonce = entrypoint.getNonce(sender, 0);

    //     // // Get user op fields
    //     // PackedUserOperation memory op = PackedUserOperation({
    //     //     sender: sender,
    //     //     nonce: nonce,
    //     //     initCode: _initCode,
    //     //     callData: _callDataForEntrypoint,
    //     //     accountGasLimits: 500_000,
    //     //     verificationGasLimit: 500_000,
    //     //     preVerificationGas: 500_000,
    //     //     maxFeePerGas: 0,
    //     //     maxPriorityFeePerGas: 0,
    //     //     paymasterAndData: bytes(""),
    //     //     signature: bytes("")
    //     // });

    //     // Sign UserOp
    //     // bytes32 opHash = IEntryPoint(entrypoint).getUserOpHash(op);
    //     // bytes32 msgHash = ECDSA.toEthSignedMessageHash(opHash);

    //     // (uint8 v, bytes32 r, bytes32 s) = vm.sign(_signerPKey, msgHash);
    //     // bytes memory userOpSignature = abi.encodePacked(r, s, v);

    //     // address recoveredSigner = ECDSA.recover(msgHash, v, r, s);
    //     // address expectedSigner = vm.addr(_signerPKey);
    //     // assertEq(recoveredSigner, expectedSigner);

    //     // op.signature = userOpSignature;
    //     op.signature = new bytes(0);

    //     // Store UserOp
    //     ops = new UserOperation[](1);
    //     ops[0] = op;
    // }

    function setUp() public {
        entryPoint = new EntryPoint();
        account = new QuasarAccount(entryPoint);
    }

    function testAA() public {
        uint256 nonce = account.getNonce();
        // bytes transferCalldata = abi.encodeWithSignature("transfer(address,uint256)", address(account), 1000e18);
        // PackedUserOperation memory userOp = PackedUserOperation({
        //     sender: address(this),
        //     nonce: nonce,
        //     initCode: new bytes(0),
        //     callData: new bytes(0),
        //     accountGasLimits: bytes32(0),
        //     preVerificationGas: 21000,
        //     gasFees: bytes32(0),
        //     paymasterAndData: new bytes(0),
        //     signature: new bytes(0)
        // });
        // construct calldata for entrypoint
        // create signature
        // call entrypoint
    }
}