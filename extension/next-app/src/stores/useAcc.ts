import { create } from "zustand";

interface IAcc {
  isLocked: boolean;
  account?: {
    mnemonic: string;
    password: string;
  };
}

export const useAcc = create<IAcc>((set) => ({
  isLocked: true,
  account: undefined,
}));
