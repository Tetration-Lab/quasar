// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import "./interfaces/IDilithiumPublicKey.sol";
import "@tetrationlab/dilithium/contract/Dilithium.sol";
import "@tetrationlab/dilithium/contract/Packing.sol";

contract SimpleQuasarAccount {
    Dilithium immutable dilithium;
    Packing immutable packing;

    IDilithiumPublicKey public publicKey;

    constructor(Dilithium _dilithium, Packing _packing) {
        dilithium = _dilithium;
        packing = _packing;
    }

    function initialize(IDilithiumPublicKey _publicKey) external {
        if (address(publicKey) != address(0)) {
            revert("Already initialized");
        }
        publicKey = _publicKey;
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

    function verify(bytes calldata signature, bytes32 message) public view returns (bool) {
        Dilithium.ExpandedPublicKey memory epk = publicKey.expandedPublicKey();
        Dilithium.Signature memory sig = packing.unpack_sig(signature);
        return dilithium.verifyExpanded(sig, epk, bytes.concat(message));
    }

    function execute(address dest, uint256 value, bytes calldata func, bytes calldata signature) external {
        require(verify(signature, keccak256(abi.encode(dest, value, func))), "Invalid signature");
        _call(dest, value, func);
    }
    
    receive() external payable {}
}
