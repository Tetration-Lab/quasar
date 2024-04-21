import { defineChain, http } from "viem";
import {
  arbitrumSepolia,
  gnosisChiado,
  morphSepolia,
  neonDevnet,
  sepolia,
} from "viem/chains";
import { createConfig } from "wagmi";

const opAvailSepolia = defineChain({
  id: 202402021700,
  name: "OP Avail Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://op-avail-sepolia.alt.technology"],
      webSocket: ["wss://op-avail-sepolia.alt.technology/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://op-avail-sepolia-explorer.alt.technology",
      apiUrl: "https://op-avail-sepolia-explorer.alt.technology/api",
    },
  },
  testnet: true,
});

export const chains = [
  {
    ...arbitrumSepolia,
    icon: "/next-assets/chains/arb.svg",
    isDisabled: false,
  },
  {
    ...sepolia,
    icon: "/next-assets/chains/ethereum.svg",
    isDisabled: false,
  },
  {
    ...opAvailSepolia,
    icon: "/next-assets/chains/avail.png",
    isDisabled: false,
  },
  {
    ...gnosisChiado,
    icon: "/next-assets/chains/gnosis.svg",
    isDisabled: false,
  },
  { ...morphSepolia, icon: "/next-assets/chains/morph.png", isDisabled: true },
  { ...neonDevnet, icon: "/next-assets/chains/neon.png", isDisabled: true },
];

export const config = createConfig({
  chains: [opAvailSepolia, sepolia, arbitrumSepolia, gnosisChiado],
  transports: {
    [arbitrumSepolia.id]: http(),
    [sepolia.id]: http(),
    [opAvailSepolia.id]: http(),
    [gnosisChiado.id]: http(),
  },
});
