import { create } from "zustand";

interface IPrice {
  denoms: {
    [key: string]: number;
  };
  isFetched: boolean;
  fetchPrice: () => Promise<void>;
}

export const usePrice = create<IPrice>((set, get) => ({
  denoms: {},
  isFetched: false,
  fetchPrice: async () => {
    if (get().isFetched) return;
    set({ isFetched: true });
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await res.json();
    set({
      denoms: {
        ETH: data.ethereum.usd,
        xDAI: 1,
      },
    });
  },
}));
