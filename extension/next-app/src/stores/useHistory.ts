import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { chromeStorage } from "./chrome";
import { Hex } from "viem";

interface IHistory {
  history: {
    [chainId: number]: Hex[];
  };
}

export const useHistory = create(
  persist<IHistory>(
    (set, get) => ({
      history: {},
    }),
    {
      name: "history",
      storage: createJSONStorage(() => chromeStorage),
    }
  )
);
