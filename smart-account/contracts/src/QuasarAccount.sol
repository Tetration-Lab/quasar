// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import { BaseAccount, IEntryPoint, PackedUserOperation } from "./core/BaseAccount.sol";

contract QuasarAccount is BaseAccount {

    address public owner;
    IEntryPoint private immutable _entryPoint;
    enum SignatureScheme { Lamport, Dilithium, Falcon }

    receive() external payable {}

    constructor(IEntryPoint entryPoint_) {
        // owner = 1111
        _entryPoint = entryPoint_;
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }
    
    function _validateSignature(
        PackedUserOperation calldata userOp, 
        bytes32 userOpHash
    ) internal override returns (uint256 validationData) {
        return 0;
    }

    function _validateQuantumSignature(
        bytes memory signature,
        bytes memory publicKeys,
        bytes memory msgs
    ) internal returns (bool) {
        return true;
    }

    function _requireFromEntryPointOrOwner() internal view {
        require(msg.sender == address(entryPoint()) || msg.sender == owner, "account: not Owner or EntryPoint");
    } 

    function entryPoint() public view override returns (IEntryPoint) {
        return _entryPoint;
    }

    function execute(address dest, uint256 value, bytes calldata func, bytes calldata signature) external {
        _requireFromEntryPointOrOwner();
        _call(dest, value, func);
    }
}