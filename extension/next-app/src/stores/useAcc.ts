import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAcc {
  isLocked: boolean;
  account?: {
    mnemonic: string;
    password: string;
  };
  lock: () => void;
  unlock: (password: string) => boolean;
  reset: () => void;
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
    }
  )
);
