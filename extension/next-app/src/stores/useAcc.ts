/*global chrome*/
import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

const chromeEnabled = !!(
  typeof chrome !== "undefined" &&
  chrome.storage &&
  chrome.storage.local
);
const chromeStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (chromeEnabled) {
      const kv = await chrome.storage.local.get(name);
      return kv[name];
    } else {
      return localStorage.getItem(name);
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (chromeEnabled) {
      await chrome.storage.local.set({
        [name]: value,
      });
    } else {
      localStorage.setItem(name, value);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (chromeEnabled) {
      await chrome.storage.local.remove(name);
    } else {
      localStorage.removeItem(name);
    }
  },
};

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
    }),
    {
      name: "acc-storage",
      storage: createJSONStorage(() => chromeStorage),
    }
  )
);
