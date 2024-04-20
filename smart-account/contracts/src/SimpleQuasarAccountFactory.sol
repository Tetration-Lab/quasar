// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import "./SimpleQuasarAccount.sol";
import "./interfaces/IDilithiumPublicKey.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "@tetrationlab/dilithium/contract/Dilithium.sol";
import "@tetrationlab/dilithium/contract/Packing.sol";

contract SimpleQuasarAccountFactory {
    Dilithium immutable dilithium;
    Packing immutable packing;

    mapping(address => bool) public accounts;

    event AccountCreated(address account);

    constructor(Dilithium _dilithium, Packing _packing) {
        dilithium = _dilithium;
        packing = _packing;
    }

    function createAccount(IDilithiumPublicKey publicKey) external returns (address) {
        bytes32 pkHash = keccak256(abi.encode(publicKey.expandedPublicKey()));
        address account = Create2.deploy(
            0, pkHash, abi.encodePacked(type(SimpleQuasarAccount).creationCode, abi.encode(dilithium, packing))
        );
        SimpleQuasarAccount(account).initialize(publicKey);
        accounts[account] = true;
        emit AccountCreated(account);
        return account;
    }
}
