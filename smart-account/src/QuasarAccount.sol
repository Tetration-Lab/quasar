// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { BaseAccount, IEntryPoint, PackedUserOperation } from "./core/BaseAccount.sol";

contract QuasarAccount is BaseAccount, Ownable {

    IEntryPoint private immutable _entryPoint;

    receive() external payable {}

    constructor(IEntryPoint entryPoint_) Ownable(msg.sender) {
        _entryPoint = entryPoint_;
    }
    
    function _validateSignature(
        PackedUserOperation calldata userOp, 
        bytes32 userOpHash
    ) internal override returns (uint256 validationData) {
        return 0;
    }

    function entryPoint() public view override returns (IEntryPoint) {
        return _entryPoint;
    }
}