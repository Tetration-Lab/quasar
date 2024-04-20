import {
  Address,
  BlockTag,
  Hex,
  createPublicClient,
  fromHex,
  http,
  toBytes,
  toHex,
} from "viem";
import { getMnemonic, getNetwork } from "./storage";

export const evmCall = async (params: any[]) => {
  const tx = {} as {
    to: string;
    account: string;
    data: string;
    value: string;
    blockTag: string;
  };
  const param1 = params[0] as any;
  if (param1.to) tx.to = param1.to;
  if (param1.from) tx.account = param1.from;
  if (param1.data) tx.data = param1.data;
  if (param1.value) tx.value = param1.value;
  const param2 = params[1] as string;
  if (param2.startsWith("0x")) {
    tx.blockTag = param2;
  } else {
    tx.blockTag = "latest";
  }

  const network = await getNetwork();
  const provider = createPublicClient({
    chain: network,
    transport: http(),
  });
  const result = await provider.call({
    account: tx.account as Address,
    to: tx.to as Address,
    data: tx.data,
    value: tx.value,
    blockTag: tx.blockTag as BlockTag,
  });
  return result.data;
};

export const signMessage = async (hex: string) => {
  const mnemonic = await getMnemonic();
  const dilithium = await import("pqc_dilithium");
  const keys = dilithium.Keys.derive(toBytes(mnemonic));
  const bytes = keys.sign_bytes(fromHex(hex as Hex, "bytes"), true);
  const signature = toHex(bytes);
  return signature;
};
