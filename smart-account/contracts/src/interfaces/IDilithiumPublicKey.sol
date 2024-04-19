// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import "@tetrationlab/dilithium/Dilithium.sol";

interface IDilithiumPublicKey {
    function expandedPublicKey() external pure returns (Dilithium.ExpandedPublicKey memory);
}
