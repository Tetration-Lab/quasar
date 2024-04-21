import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { chromeStorage } from "./chrome";
import { Hex } from "viem";

interface IHistory {
  history: {
    [chainId: number]: Hex[];
  };
  addHistory: (chainId: number, txHash: Hex) => void;
}

export const useHistory = create(
  persist<IHistory>(
    (set, get) => ({
      history: {},
      addHistory: (chainId, txHash) => {
        set((state) => {
          const history = state.history[chainId] || [];
          return {
            history: {
              ...state.history,
              [chainId]: [txHash, ...history],
            },
          };
        });
      },
    }),
    {
      name: "history",
      storage: createJSONStorage(() => chromeStorage),
    }
  )
);
