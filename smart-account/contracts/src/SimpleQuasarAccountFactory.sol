// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import "./SimpleQuasarAccount.sol";
import "./interfaces/IDilithiumPublicKey.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

contract SimpleQuasarAccountFactory {
    mapping(address => bool) public accounts;

    event AccountCreated(address account);

    function createAccount(IDilithiumPublicKey publicKey) external returns (address) {
        bytes32 pkHash = keccak256(abi.encode(publicKey.expandedPublicKey()));
        address account = Create2.deploy(0, pkHash, type(SimpleQuasarAccount).creationCode);
        SimpleQuasarAccount(account).initialize(publicKey);
        accounts[account] = true;
        emit AccountCreated(account);
        return account;
    }
}
