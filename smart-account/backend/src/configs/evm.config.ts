export const evmConfig = () => ({
    privateKey: process.env.PRIVATE_KEY,
    privateKeyT1: process.env.PRIVATE_KEY_T1,
    privateKeyMat0: process.env.PRIVATE_KEY_MAT0,
    privateKeyMat1: process.env.PRIVATE_KEY_MAT1,
    privateKeyMat2: process.env.PRIVATE_KEY_MAT2,
    privateKeyMat3: process.env.PRIVATE_KEY_MAT3,
    contractRootPath: process.env.CONTRACT_PATH,
    arbitrum: {
        rpc: process.env.ARBITRUM_RPC,
        factory: process.env.ARBITRUM_FACTORY
    },
    eth: {
        rpc: process.env.ETH_RPC,
        factory: process.env.ETH_FACTORY
    },
    gnosis: {
        rpc: process.env.GNOSIS_RPC,
        factory: process.env.GNOSIS_FACTORY
    },
    avail: {
        rpc: process.env.AVAIL_RPC,
        factory: process.env.AVAIL_FACTORY
    },
})