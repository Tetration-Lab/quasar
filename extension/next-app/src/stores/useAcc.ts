/*global chrome*/
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { chromeStorage } from "./chrome";
import { chains } from "../constants/web3";
import { Chain } from "viem";

interface IAcc {
  isLocked: boolean;
  account?: {
    mnemonic: string;
    password: string;
  };
  lock: () => void;
  unlock: (password: string) => boolean;
  reset: () => void;
  connectedWebsite?: string;
  connect: (website: string) => void;
  disconnect: () => void;
  connectedChain?: Chain;
}

export const useAcc = create(
  persist<IAcc>(
    (set, get) => ({
      isLocked: false,
      account: undefined,
      lock: () => set({ isLocked: true }),
      unlock: (password: string) => {
        const pw = get().account?.password;
        if (pw && pw === password) {
          set({
            isLocked: false,
          });
          return true;
        }
        return false;
      },
      reset: () => set({ isLocked: true, account: undefined }),
      connect: (website: string) => {
        set({ connectedWebsite: website });
      },
      connectedNetwork: chains[0],
      disconnect: () => {
        set({ connectedWebsite: undefined });
      },
    }),
    {
      name: "acc-storage",
      storage: createJSONStorage(() => chromeStorage),
    }
  )
);
