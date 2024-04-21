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

    error AccountAlreadyCreated(address account, address publicKey, bytes32 publicKeyHash);

    mapping(address => bool) public created;
    mapping(bytes32 => address[2]) public registry;

    event AccountCreated(address indexed account, address indexed publicKey, bytes32 indexed publicKeyHash);

    constructor(Dilithium _dilithium, Packing _packing) {
        dilithium = _dilithium;
        packing = _packing;
    }

    function createAccount(IDilithiumPublicKey publicKey) external returns (address) {
        bytes32 pkHash = keccak256(abi.encode(publicKey.expandedPublicKey()));

        if (registry[pkHash][0] != address(0)) {
            revert AccountAlreadyCreated(registry[pkHash][0], registry[pkHash][1], pkHash);
        }

        address account = Create2.deploy(
            0, pkHash, abi.encodePacked(type(SimpleQuasarAccount).creationCode, abi.encode(dilithium, packing))
        );
        SimpleQuasarAccount(payable(account)).initialize(publicKey);
        created[account] = true;
        registry[pkHash] = [account, address(publicKey)];

        emit AccountCreated(account, address(publicKey), pkHash);

        return account;
    }
}
