interface RequestArguments {
  id?: string | undefined;
  method: string;
  params?: unknown[] | object;
}

interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

const ProviderInfo: EIP6963ProviderInfo = {
  uuid: "1234",
  name: "Quasar",
  icon: "",
  rdns: "quasar.tetrationlab.com",
};

function loadEIP1193Provider(provider: any) {
  function announceProvider() {
    const info: EIP6963ProviderInfo = ProviderInfo;
    window.dispatchEvent(
      new CustomEvent("eip6963:announceProvider", {
        detail: Object.freeze({ info, provider }),
      })
    );
  }

  window.addEventListener(
    "eip6963:requestProvider",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (event: any) => {
      announceProvider();
    }
  );

  announceProvider();
}

const listners = {
  accountsChanged: new Set<(p?: any) => void>(),
  connect: new Set<(p?: any) => void>(),
  disconnect: new Set<(p?: any) => void>(),
  chainChanged: new Set<(p?: any) => void>(),
  once: {
    accountsChanged: new Set<(p?: any) => void>(),
    connect: new Set<(p?: any) => void>(),
    disconnect: new Set<(p?: any) => void>(),
    chainChanged: new Set<(p?: any) => void>(),
  },
};

const promResolvers = new Map();

const getListnersCount = (): number => {
  let count = 0;
  for (const key of Object.keys(listners)) {
    if (key === "once") {
      for (const onceKey of Object.keys(listners[key])) {
        count += (<any>listners)[key][onceKey]?.length;
      }
    } else {
      count += (<any>listners)[key].length;
    }
  }
  return count;
};

const sendMessage = (
  args: RequestArguments,
  ping = false,
  from = "request"
): Promise<unknown> => {
  if (promResolvers.size < 10) {
    return new Promise((resolve, reject) => {
      const resId = [
        ...`${Math.random().toString(16) + Date.now().toString(16)}`,
      ]
        .slice(2)
        .join("");
      promResolvers.set(resId, { resolve, reject });
      const p = [
        "eth_signTypedData",
        "eth_signTypedData_v3",
        "eth_signTypedData_v4",
      ];
      const method = args.method;
      if (p.includes(args.method)) {
        args.method = undefined as any;
      }
      const data = {
        type: "WALLET_CONTENT",
        target: "metamask-contentscript",
        data: {
          method,
          name: "metamask-provider",
          data: args,
          jsonrpc: "2.0",
          id: Number(resId.replace(/[A-Za-z]/g, "").slice(0, 10)),
        },
        resId,
        from,
      };
      if (ping) {
        data.type = "WALLET_PING";
      }
      // console.info('data in', data)
      window.postMessage(data, "*");
    });
  } else {
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject({
          code: -32000,
          message: "ClearWallet: Too many requests",
          error: true,
        });
      }, 200);
    });
  }
};

class MetaMaskAPI {
  isMetaMask = true;
  _state = {
    accounts: Array(1),
    isConnected: true,
    isUnlocked: true,
    initialized: true,
    isPermanentlyDisconnected: false,
  };
  _sentWarnings = {
    enable: false,
    experimentalMethods: false,
    send: false,
    events: {},
  };
  // Deprecated - hardcoded for now, websites should not access this directly since is deprecated for a long time
  chainId = "0x89";
  // Deprecated - hardcoded for now, websites should not access this directly since is deprecated for a long time
  networkVersion = "137";
  selectedAddress = null;
  autoRefreshOnNetworkChange = false;
  // Internal Simulate Metamask
  _events = {};
  _eventsCount = 2;
  _jsonRpcConnection = {};
  _log = {};
  _maxListeners = 100;
  _metamask = new Proxy(
    {
      isUnlocked: () => {
        return Promise.resolve(true);
      },
      requestBatch: () => {
        // empty
      },
    },
    {}
  );
  _rpcEngine = {
    _events: {},
    _eventsCount: 0,
    _maxListeners: undefined,
    _middleware: Array(4),
  };
  isConnected() {
    return true;
  }
  // for maximum compatibility since is cloning the same API

  enable() {
    return sendMessage({ method: "eth_requestAccounts", params: Array(0) });
  }

  request(args: RequestArguments): Promise<unknown> {
    return sendMessage(args) as Promise<unknown>;
  }
  // Deprecated
  sendAsync(arg1: any, arg2: any): void | Promise<unknown> {
    // return this.send(arg1, arg2) as any
    if (typeof arg1 === "string") {
      return sendMessage(
        {
          method: arg1,
          params: arg2 as object,
        },
        false,
        "sendAsync"
      ) as Promise<unknown>;
    } else if (typeof arg2 === "function") {
      (
        (
          sendMessage(
            arg1 as RequestArguments,
            false,
            "sendAsync"
          ) as Promise<unknown>
        ).then((result) => {
          (arg2 as (e?: any, r?: any) => any)(undefined, {
            id: (arg1 as RequestArguments)?.id,
            jsonrpc: "2.0",
            method: (arg1 as RequestArguments).method,
            result,
          });
        }) as Promise<unknown>
      ).catch((e) => {
        (arg2 as (er?: any, r?: any) => any)(new Error(e), {
          id: (arg1 as RequestArguments)?.id,
          jsonrpc: "2.0",
          method: (arg1 as RequestArguments).method,
          error: new Error(e),
        });
      });
    } else {
      return sendMessage(
        arg1 as RequestArguments,
        false,
        "sendAsync"
      ) as Promise<unknown>;
    }
  }
  send(arg1: unknown, arg2: unknown): unknown {
    const resultFmt = async (result: Promise<any>) => {
      return {
        id: 0,
        jsonrpc: "2.0",
        result: await result,
      };
    };
    if (arg2 === undefined) {
      if (typeof arg1 === "string") {
        return resultFmt(
          sendMessage(
            {
              method: arg1,
              params: undefined,
            },
            false,
            "send"
          )
        );
      } else {
        return resultFmt(sendMessage(arg1 as RequestArguments, false, "send"));
      }
    } else if (typeof arg1 === "object") {
      if (typeof arg1 === "string") {
        return resultFmt(sendMessage(arg1 as RequestArguments, false, "send"));
      } else {
        return resultFmt(sendMessage(arg1 as RequestArguments, false, "send"));
      }
    } else if (typeof arg1 === "string") {
      return resultFmt(
        sendMessage(
          {
            method: arg1,
            params: arg2 as object,
          },
          false,
          "send"
        )
      );
    } else if (typeof arg2 === "function") {
      return resultFmt(sendMessage(arg1 as RequestArguments, false, "send"));
    } else {
      return resultFmt(sendMessage(arg1 as RequestArguments, false, "send"));
    }
  }
  on(eventName: string, callback: () => void) {
    this.addListener(eventName, callback);
    return this;
  }

  addListener(eventName: string, callback: () => void) {
    switch (eventName) {
      case "accountsChanged":
        listners.accountsChanged.add(callback);
        break;
      case "connect":
        listners.connect.add(callback);
        sendMessage(
          {
            method: "wallet_ready",
          },
          true
        );
        break;
      case "disconnect":
      case "close":
        listners.disconnect.add(callback);
        break;
      // Deprecated  - chainIdChanged -networkChanged
      case "chainChanged":
      case "chainIdChanged":
      case "networkChanged":
        listners.chainChanged.add(callback);
        break;
    }
    return this;
  }

  once(eventName: string, callback: () => void) {
    switch (eventName) {
      case "accountsChanged":
        listners.once.accountsChanged.add(callback);
        break;
      case "connect":
        listners.once.connect.add(callback);
        sendMessage(
          {
            method: "wallet_ready",
          },
          true
        );
        break;
      case "disconnect":
      case "close":
        listners.once.disconnect.add(callback);
        break;
      // Deprecated  - chainIdChanged -networkChanged
      case "chainChanged":
      case "chainIdChanged":
      case "networkChanged":
        listners.once.chainChanged.add(callback);
        break;
    }
    return this;
  }
  off(eventName: string, callback: () => void) {
    this.removeListener(eventName, callback);
    return this;
  }
  removeListener(eventName: string, callback: () => void) {
    switch (eventName) {
      case "accountsChanged":
        listners.accountsChanged.delete(callback);
        break;
      case "connect":
        listners.connect.delete(callback);
        break;
      case "disconnect":
      case "close":
        listners.disconnect.delete(callback);
        break;
      // Deprecated  - chainIdChanged -networkChanged
      case "chainChanged":
      case "chainIdChanged":
      case "networkChanged":
        listners.chainChanged.delete(callback);
        break;
      default:
        return;
    }
    return this;
  }

  removeAllListeners() {
    listners.accountsChanged.clear();
    listners.chainChanged.clear();
    listners.disconnect.clear();
    listners.connect.clear();
    return this;
  }

  getMaxListeners() {
    return 100;
  }
  _getExperimentalApi() {
    return this._metamask;
  }
  eventNames() {
    return [];
  }
  listenerCount() {
    return getListnersCount();
  }
  listners() {
    return [];
  }
  rawListners() {
    return [];
  }
  // Internal Simulate Metamask
  _warnOfDeprecation() {
    return true;
  }

  _rpcRequest() {
    return true;
  }
  _handleAccountsChanged() {
    return true;
  }

  _handleChainChanged() {
    return true;
  }
  _handleConnect() {
    return true;
  }
  _handleDisconnect() {
    return true;
  }
  _handleStreamDisconnect() {
    return true;
  }
  _handleUnlockStateChanged() {
    return true;
  }
  _sendSync() {}
}

const eth = new Proxy(new MetaMaskAPI(), {
  deleteProperty: () => {
    return true;
  },
  // set(obj, prop, value) {
  //     // Reflect.set(obj, prop, value);
  //     return true;
  //   }
});

const listner = function (event: any) {
  if (event.source != window) return;
  const eventData = event?.data;
  const eventDataData = event?.data?.data;
  const eventDataDataData = event?.data?.data?.data;
  const resId = eventData?.resId;
  const result = eventDataDataData?.result;
  if (eventData?.type === "WALLET_PAGE") {
    try {
      if (result?.error) {
        promResolvers.get(resId).reject(result);
      } else {
        promResolvers.get(resId).resolve(result);
      }
    } catch (e) {
      // console.error('Failed to connect resolve msg', e)
      promResolvers.get(resId)?.reject({
        code: -32000,
        message: "Failed to connect resolve msg",
        error: true,
      });
    }
  } else if (eventData?.type === "WALLET_PAGE_LISTENER") {
    if ((eventDataData?.listner ?? "x") in listners) {
      try {
        const listnerName = eventDataData.listner as
          | "accountsChanged"
          | "connect"
          | "disconnect"
          | "chainChanged";
        if (listnerName === "connect" && eventDataData) {
          (<any>eth).networkVersion = String(
            parseInt(eventDataDataData?.chainId ?? "0x89", 16)
          );
          (<any>eth).chainId = eventDataDataData?.chainId ?? "0x89";
          (<any>eth).selectedAddress = eventDataData?.address?.[0] ?? null;
          (<any>eth).accounts = [eventDataData.address?.[0]] ?? [];
          (<any>eth).isConnected = () => true;
        } else if (listnerName === "chainChanged") {
          (<any>eth).networkVersion = String(
            parseInt(eventDataDataData ?? "0x89", 16)
          );
          (<any>eth).chainId = eventDataData ?? "0x89";
        } else if (listnerName === "accountsChanged") {
          (<any>eth).accounts = [eventDataData?.[0]] ?? [];
          (<any>eth).selectedAddress = eventDataData?.[0] ?? "";
        }
        listners[listnerName].forEach((listner) => listner(eventDataDataData));
        listners.once[listnerName].forEach((listner) => {
          listner(eventDataData);
          listners.once[listnerName].delete(listner);
        });
      } catch (e) {
        // console.info(e)
        // ignore
      }
    }
  }
  if (
    promResolvers.has(resId) &&
    (eventData?.type === "WALLET_PAGE" ||
      eventData?.type === "WALLET_PAGE_LISTENER")
  ) {
    promResolvers.delete(resId);
  }
};

window.addEventListener("message", listner);

Object.defineProperties(eth, {
  selectedAddress: { enumerable: false },
  chainId: { enumerable: false },
  networkVersion: { enumerable: false },
});

const web3Shim = {
  currentProvider: eth,
  __isMetaMaskShim__: true,
};

const injectWallet = (win: any) => {
  Object.defineProperty(win, "ethereum", {
    value: eth,
  });
  Object.defineProperty(win, "web3", {
    value: web3Shim,
  });
  sendMessage(
    {
      method: "wallet_ready",
    },
    true
  );
};

injectWallet(this);
loadEIP1193Provider(eth);
