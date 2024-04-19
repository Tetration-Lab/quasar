/// <reference types="chrome"/>
/// <reference types="viem"/>

import { getAddress, getNetwork, isWebsiteConnected } from "./storage";
import { evmCall } from "./wallet";

interface RequestArgument {
  method: string;
  type?: string;
  params?: any[];
  resId?: string;
  website?: string;
  data?: any;
}

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
  (message: RequestArgument, sender, sendResponse) => {
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
          case "eth_call": {
            try {
              sendResponse(await evmCall(message?.params ?? []));
            } catch (e) {
              sendResponse({
                error: true,
                code: rpcError.USER_REJECTED,
                message: "No network or user selected",
              });
              console.warn("Error: eth_call", e);
            }
            break;
          }
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
          case "eth_accounts": {
            const url = new URL(message.website);
            const isConnected = await isWebsiteConnected(url.origin);
            if (isConnected) {
              sendResponse([await getAddress()]);
            } else {
              sendResponse({
                error: true,
                code: rpcError.USER_REJECTED,
                message: "Not connected",
              });
            }
          }
          case "eth_chainId": {
            const chainId = await getNetwork();
            if (chainId) {
              sendResponse(`0x${chainId.id.toString(16)}`);
            } else {
              sendResponse({
                error: true,
                code: rpcError.INTERNAL_ERROR,
                message: "Not connected",
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
