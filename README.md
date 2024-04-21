# Quasar, a post-quantum AA

> This is a contribution to [Post Quantum Ethereum](https://github.com/Tetration-Lab/post-quantum-ethereum/) world! Made in [Scaling Etheruem 2024](https://ethglobal.com/showcase/quasar-m8xcv) Hackathon.

![Cover](/assets/0.png)

Quantum computers will be here one day. Without proper preparation, there will be significant damage. Quasar, a post-quantum account abstraction (PQAA), is part of a wider effort to prepare for post-quantum Ethereum.

## Why

Shor's algorithm on quantum computers can efficiently solve the elliptic-curve discrete logarithm problem and break ECDSA, BLS, etc., which are the signature schemes we use in Ethereum. There are some preparations that we can make to mitigate the damage when Q-day comes. This work is one of them.

## Quasar

Quasar is a smart contract wallet (AA) and browser extension.

## Usage

Quasar is still a functional proof of concept (PoC). We do not recommend using it in production environments.

### Built Extension

The built extension files can be found in `/extension/extension`, user can directly import this to chrome/chromium to use the extension.

|Landing|Import|Home|Send Tx|Sign Msg|
|-|-|-|-|-|
|![1](/assets/1.png)|![2](/assets/2.png)|![3](/assets/3.png)|![4](/assets/4.png)|![5](/assets/5.png)|

## Structure

- [/extension](/extension/) contain browser extension code
- [/smart-account](/smart-account/) contain smart contract and relayer code

## Others effort

- [Dilithium solidity](https://github.com/Tetration-Lab/dilithium-solidity)
- [Falcon solidity](https://github.com/Tetration-Lab/falcon-solidity), 
- [Lamport solidity](https://github.com/Tetration-Lab/lamport-solidity), 
- [Post-Quantum Ethereum](https://github.com/Tetration-Lab/post-quantum-ethereum), 

## Deployed Contracts

- Arbitrum: https://sepolia.arbiscan.io/address/0xca483dF1Ca11966A5bDE0d965981845d3cF26E6b#readContract
- Gnosis: https://gnosis-chiado.blockscout.com/address/0xca483dF1Ca11966A5bDE0d965981845d3cF26E6b?tab=contract
- Avail: https://op-avail-sepolia-explorer.alt.technology/address/0xca483dF1Ca11966A5bDE0d965981845d3cF26E6b 
- Morph: https://explorer-testnet.morphl2.io/address/0x826Ab541071Bd86C0234068eaFCBBA17d15280D2?tab=contract
