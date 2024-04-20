export const evmConfig = () => ({
    privateKey: process.env.PRIVATE_KEY,
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