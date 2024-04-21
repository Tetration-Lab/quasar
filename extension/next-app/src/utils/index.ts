export const openInNewTab = (url: string) => {
  if (typeof chrome !== "undefined" && chrome.tabs)
    chrome.tabs.create({
      url,
    });
  else window.open(url, "_blank").focus();
};
