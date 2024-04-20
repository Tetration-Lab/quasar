export const evmConfig = () => ({
    privateKey: process.env.PRIVATE_KEY,
    contractRootPath: process.env.CONTRACT_PATH,
    arbitrum: {
        rpc: process.env.ARBITRUM_RPC,
        factory: process.env.ARBITRUM_FACTORY
    }
})