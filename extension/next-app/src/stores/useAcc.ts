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
  connectedNetwork: Chain;
  switchNetwork: (chain: Chain) => void;
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
      disconnect: () => {
        set({ connectedWebsite: undefined });
      },
      connectedNetwork: chains[0],
      switchNetwork: (chain: Chain) => {
        set({ connectedNetwork: chain });
      },
    }),
    {
      name: "acc-storage",
      storage: createJSONStorage(() => chromeStorage),
    }
  )
);
