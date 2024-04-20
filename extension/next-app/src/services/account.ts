import { toBytes } from "viem";
import axios from "axios";

export const createAccountOnChain = async (
  mnemonic: string,
  chainId: number
) => {
  const dilithium = await import("pqc_dilithium");
  const key = dilithium.Keys.derive(toBytes(mnemonic));
  const keyJson = key.expanded_pk_json();
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/createAccount/${chainId}`,
    JSON.parse(keyJson)
  );

  return {
    publicKeyAddress: response.data.publicKeyAddress,
    address: response.data.accountAddress,
    epk: keyJson,
  };
};
