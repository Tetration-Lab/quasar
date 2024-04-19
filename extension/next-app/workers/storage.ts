import { Chain } from "viem";

export const storageSave = async (key: string, value: any): Promise<void> => {
  await chrome.storage.local.set({ [key]: value });
};

export const storageGet = async (key: string): Promise<any> => {
  return (
    JSON.parse(
      (await chrome.storage.local.get(key).then((res) => res[key])) || {}
    ).state || {}
  );
};

export const storageGetMain = async (): Promise<any> => {
  return storageGet("acc-storage");
};

export const isWebsiteConnected = async (website: string): Promise<boolean> => {
  const storage = await storageGetMain();
  const connected = storage?.connectedWebsite as string | undefined;
  return connected === website;
};

export const getAddress = async (): Promise<string> => {
  return "0x0000000000000000000000000000000000000008";
};

export const getNetwork = async (): Promise<Chain | undefined> => {
  return await storageGetMain().then((res) => res?.connectedNetwork);
};
