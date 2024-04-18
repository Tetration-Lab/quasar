/// <reference types="chrome"/>
interface RequestArgument {
  method: string;
  type?: string;
  params?: any[];
  resId?: string;
  website?: string;
  data?: any;
}

const storageSave = async (key: string, value: any): Promise<void> => {
  await chrome.storage.local.set({ [key]: value });
};

const storageGet = async (key: string): Promise<any> => {
  return JSON.parse(await chrome.storage.local.get(key).then((res) => res[key]))
    .state;
};

const isWebsiteConnected = async (website: string): Promise<boolean> => {
  const storage = await storageGet("acc-storage");
  const connected = storage.connectedWebsite as string | undefined;
  return connected === website;
};

const getAddress = async (): Promise<string> => {
  return "0x0000000000000000000000000000000000000008";
};

const getNetwork = async (): Promise<number> => {
  return 1;
};

const rpcError = {
  USER_REJECTED: 4001,
  INVALID_PARAM: -32602,
  INTERNAL_ERROR: -32603,
};

const userReject = {} as Record<string, (() => any) | undefined>;
const userApprove = {} as Record<string, ((a: unknown) => any) | undefined>;
const rIdWin = {} as Record<string, string | undefined>;
const rIdData = {} as Record<string, any | undefined>;

chrome.runtime.onMessage.addListener(
  async (message: RequestArgument, sender, sendResponse) => {
    if (chrome.runtime.lastError) {
      console.info("Error receiving message:", chrome.runtime.lastError);
    }

    (async () => {
      if (!message?.method || message?.type !== "WALLET_CONTENT_MSG") {
        sendResponse({
          error: true,
          code: 500,
          message: "Invalid request method",
        });
      } else {
        // ETH API
        switch (message.method) {
          case "eth_requestAccounts": {
            const url = new URL(message.website);
            let isConnected = await isWebsiteConnected(url.origin);
            if (!isConnected) {
              isConnected = await new Promise<boolean>(
                async (resolve, reject) => {
                  const win = await chrome.windows.create({
                    width: 350,
                    height: 600,
                    url: `connect.html?url=${url.origin}&rid=${message.resId}`,
                    type: "popup",
                  });

                  userReject[String(win.id)] = reject;
                  userApprove[String(win.id)] = resolve;
                  rIdWin[String(win.id)] = String(message.resId);
                  rIdData[String(win.id)] = {};
                }
              );
            }

            if (isConnected) {
              sendResponse([await getAddress()]);
            } else {
              sendResponse({
                error: true,
                code: rpcError.USER_REJECTED,
                message: "User rejected",
              });
            }

            break;
          }
          case "wallet_approve": {
            if (String(sender.tab?.windowId) in rIdWin) {
              userApprove[String(sender.tab?.windowId)]?.(true);
            }
            try {
              chrome.windows.remove(sender.tab?.windowId ?? 0);
            } catch {}
            break;
          }
          case "wallet_reject": {
            if (String(sender.tab?.windowId) in rIdWin) {
              userApprove[String(sender.tab?.windowId)]?.(false);
            }
            try {
              chrome.windows.remove(sender.tab?.windowId ?? 0);
            } catch {}
            break;
          }
          case "wallet_send_data": {
            if (String(sender.tab?.windowId) in rIdData) {
              const intData =
                rIdData[String(sender?.tab?.windowId ?? "")] ?? {};
              rIdData[String(sender?.tab?.windowId ?? "")] = {
                ...intData,
                ...(message?.data ?? {}),
              };
              sendResponse(true);
            }
            break;
          }
          case "wallet_get_data": {
            if (String(sender.tab?.windowId) in rIdData) {
              sendResponse(rIdData[String(sender?.tab?.windowId ?? "")] ?? {});
            }
            break;
          }
          case "wallet_ping": {
            sendResponse(true);
            break;
          }
          default:
            sendResponse({
              error: true,
              code: 500,
              message: "Invalid method",
            });
            break;
        }
      }
    })();

    return true;
  }
);
