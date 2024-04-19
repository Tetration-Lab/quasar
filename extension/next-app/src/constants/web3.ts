import {
  arbitrumSepolia,
  gnosisChiado,
  morphSepolia,
  neonDevnet,
  sepolia,
} from "viem/chains";

export const chains = [
  {
    ...sepolia,
    icon: "/next-assets/chains/ethereum.svg",
  },
  { ...arbitrumSepolia, icon: "/next-assets/chains/arb.svg" },
  { ...gnosisChiado, icon: "/next-assets/chains/gnosis.svg" },
  { ...morphSepolia, icon: "/next-assets/chains/morph.png" },
  { ...neonDevnet, icon: "/next-assets/chains/neon.png" },
];
