// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import "./interfaces/IDilithiumPublicKey.sol";
import "@tetrationlab/dilithium/Dilithium.sol";
import "@tetrationlab/dilithium/Packing.sol";

contract SimpleQuasarAccount {
    IDilithiumPublicKey public publicKey;

    constructor() {}

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

    function verify(bytes calldata signature, bytes32 message) internal view returns (bool) {
        Dilithium.ExpandedPublicKey memory epk = publicKey.expandedPublicKey();
        Dilithium.Signature memory sig = Packing.unpack_sig(signature);
        return Dilithium.verifyExpanded(sig, epk, bytes.concat(message));
    }

    function execute(address dest, uint256 value, bytes calldata func, bytes calldata signature) external {
        require(verify(signature, keccak256(abi.encode(dest, value, func))), "Invalid signature");
        _call(dest, value, func);
    }
}
