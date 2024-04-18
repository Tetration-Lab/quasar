export const storageSave = async (key: string, value: any): Promise<void> => {
  await chrome.storage.local.set({ [key]: value });
};

export const storageGet = async (
  key: string
): Promise<{ [key: string]: any }> => {
  return await chrome.storage.local.get(key);
};
