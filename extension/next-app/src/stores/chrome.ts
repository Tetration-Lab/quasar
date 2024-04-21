import { StateStorage } from "zustand/middleware";

export const approve = (rId: string) => {
  chrome.runtime.sendMessage(
    { method: "wallet_approve", resId: rId, type: "WALLET_CONTENT_MSG" },
    (r) => {
      if (chrome.runtime.lastError) {
        console.warn("LOC4: Error sending message:", chrome.runtime.lastError);
      }
      return r;
    }
  );
};

export const reject = (rId: string) => {
  chrome.runtime.sendMessage(
    { method: "wallet_reject", resId: rId, type: "WALLET_CONTENT_MSG" },
    (r) => {
      if (chrome.runtime.lastError) {
        console.warn("LOC5: Error sending message:", chrome.runtime.lastError);
      }
      return r;
    }
  );
};

export const sendData = (rId: string, data: any) => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        method: "wallet_send_data",
        resId: rId,
        data,
        type: "WALLET_CONTENT_MSG",
      },
      (r) => {
        if (chrome.runtime.lastError) {
          console.warn(
            "LOC5: Error sending message:",
            chrome.runtime.lastError
          );
        }
        resolve(r);
      }
    );
  });
};

const chromeEnabled = !!(
  typeof chrome !== "undefined" &&
  chrome.storage &&
  chrome.storage.local
);
export const chromeStorage: StateStorage = {
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
