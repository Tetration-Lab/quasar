# Quasar, a post-quantum AA
Quantum computers will be here one day. Without proper preparation, there will be significant damage. Quasar, a post-quantum account abstraction (PQAA), is part of a wider effort to prepare for post-quantum Ethereum.

## why
Shor's algorithm on quantum computers can efficiently solve the elliptic-curve discrete logarithm problem and break ECDSA, BLS, etc., which are the signature schemes we use in Ethereum. There are some preparations that we can make to mitigate the damage when Q-day comes. This work is one of them.

## Quasar
Quasar is a smart contract wallet (AA) and browser extension.

## usage
Quasar is still a functional proof of concept (PoC). We do not recommend using it in production environments.

## structure
- [/extension](/extension/) contain browser extension code
- [/smart-account](/smart-account/) contain smart contract and relayer code

## others effort
- [Dilithium solidity](https://github.com/Tetration-Lab/dilithium-solidity)
- [Falcon solidity](https://github.com/Tetration-Lab/falcon-solidity), 
- [Lamport solidity](https://github.com/Tetration-Lab/lamport-solidity), 
- [Post-Quantum Ethereum](https://github.com/Tetration-Lab/post-quantum-ethereum), 
