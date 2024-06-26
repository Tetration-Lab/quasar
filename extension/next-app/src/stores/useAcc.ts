/*global chrome*/
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { chromeStorage } from "./chrome";
import { chains } from "../constants/web3";
import { Address, Chain } from "viem";
import { createAccountOnChain } from "../services/account";

interface IAcc {
  isLocked: boolean;
  account?: {
    mnemonic: string;
    password: string;
    epk: string; // json string
    address: Address;
    chains: number[];
  };
  publicKeyAddresses: {
    [chainId: number]: Address;
  };
  setAccount: (account: {
    mnemonic: string;
    password: string;
  }) => Promise<void>;
  isSettingAccount: boolean;
  addSupportedChain: (chainId: number) => Promise<void>;
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
      setAccount: async (account) => {
        set({ isSettingAccount: true });

        try {
          const { address, epk, publicKeyAddress } = await createAccountOnChain(
            account.mnemonic,
            chains[0].id
          );
          set({
            account: {
              mnemonic: account.mnemonic,
              password: account.password,
              epk,
              chains: [chains[0].id],
              address,
            },
            isLocked: false,
          });
          set((state) => ({
            publicKeyAddresses: {
              ...state.publicKeyAddresses,
              [chains[0].id]: publicKeyAddress,
            },
          }));
        } catch (e) {
          set({ isSettingAccount: false });
          throw e;
        }
      },
      isSettingAccount: false,
      addSupportedChain: async (chainId) => {
        if (!get().account) return;
        set((state) => ({
          account: {
            ...state.account,
            chains: [...state.account?.chains, chainId],
          },
        }));
      },
      publicKeyAddresses: {},
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
