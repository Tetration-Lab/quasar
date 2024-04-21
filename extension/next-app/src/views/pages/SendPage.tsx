import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAcc } from "../../stores/useAcc";
import { useBalance, useEstimateGas, useGasPrice } from "wagmi";
import {
  Address,
  Hex,
  checksumAddress,
  encodeAbiParameters,
  encodeFunctionData,
  formatEther,
  formatGwei,
  fromHex,
  keccak256,
  parseAbi,
  parseAbiParameters,
  toBytes,
  toHex,
} from "viem";
import {
  LuAlertCircle,
  LuCheckCircle,
  LuCopy,
  LuExternalLink,
  LuFuel,
} from "react-icons/lu";
import { openInNewTab } from "../../utils";
import { usePrice } from "../../stores/usePrice";
import numbro from "numbro";
import { RandomAvatar } from "react-random-avatars";
import { approve, reject, sendData } from "../../stores/chrome";
import { useCallback, useState } from "react";
import { sendProxyTransaction } from "../../services/account";
import { useHistory } from "../../stores/useHistory";

export const SendPage = () => {
  const router = useRouter();
  const to = checksumAddress(router.query.to as Address);
  const data = router.query.data as Hex;
  const value = fromHex(router.query.value as Hex, "bigint");
  const rId = router.query.rid as string;

  const acc = useAcc();
  const price = usePrice();
  const history = useHistory();

  const balance = useBalance({
    address: acc.account.address,
    chainId: acc.connectedNetwork.id,
  });
  const gasPrice = useGasPrice({
    chainId: acc.connectedNetwork.id,
  });
  const eg = useEstimateGas({
    account: acc.account.address,
    to,
    data,
    value,
    chainId: acc.connectedNetwork.id,
    maxFeePerGas: 0n,
    maxPriorityFeePerGas: 0n,
    query: {
      retry: 1,
    },
  });

  const [isSending, setIsSending] = useState(false);
  const sendMessage = useCallback(async () => {
    try {
      setIsSending(true);
      const dilithium = await import("pqc_dilithium");
      const keys = dilithium.Keys.derive(toBytes(acc.account.mnemonic));
      const message = keccak256(
        encodeAbiParameters(parseAbiParameters("address, uint, bytes"), [
          to,
          value,
          data,
        ])
      );
      const signature = toHex(
        keys.sign_bytes(fromHex(message, "bytes"), false)
      );
      const calldata = encodeFunctionData({
        abi: parseAbi([
          "function execute(address dest, uint256 value, bytes calldata func, bytes calldata signature)",
        ]),
        functionName: "execute",
        args: [to, value, data, signature],
      });
      const txHash = await sendProxyTransaction(
        acc.account.address,
        calldata,
        acc.connectedNetwork.id
      );
      history.addHistory(acc.connectedNetwork.id, txHash);
      setIsSending(false);
      return txHash;
    } catch (e) {
      setIsSending(false);
      throw e;
    }
  }, [
    acc.account,
    to,
    data,
    value,
    acc.connectedNetwork.id,
    history.addHistory,
  ]);

  return (
    <Stack h="100%" overflowY="scroll">
      <Text fontWeight="medium">Sign Transaction</Text>
      <Box h={4} />
      <Heading size="md">{data === "0x" ? `Send Token` : "Call"}</Heading>
      <Stack fontWeight="medium">
        <HStack align="start">
          <Text w={20}>Chain</Text>
          <Image src={(acc.connectedNetwork as any).icon} boxSize="20px" />
          <Text as="b">{acc.connectedNetwork.name}</Text>
        </HStack>
        <HStack align="start">
          <Text w={20}>Value</Text>
          <Stack spacing={0}>
            <Text>
              {numbro(formatEther(value)).format({
                thousandSeparated: true,
                mantissa: 18,
                trimMantissa: true,
                optionalMantissa: true,
              })}{" "}
              {acc.connectedNetwork.nativeCurrency.symbol}
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              ≈$
              {numbro(
                Number(formatEther(value)) *
                  price.denoms[acc.connectedNetwork.nativeCurrency.symbol]
              ).format({
                thousandSeparated: true,
                mantissa: 4,
                trimMantissa: true,
              })}
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              Your balance{" "}
              {numbro(formatEther(balance.data?.value || 0n)).format({
                thousandSeparated: true,
                mantissa: 18,
                trimMantissa: true,
                optionalMantissa: true,
              })}{" "}
              {acc.connectedNetwork.nativeCurrency.symbol}
            </Text>
          </Stack>
        </HStack>
        <HStack>
          <Text w={20}>To</Text>
          <Text>
            {to.slice(0, 6)}...{to.slice(to.length - 6, to.length)}
          </Text>
          <IconButton
            icon={<Icon as={LuCopy} />}
            aria-label="Copy Address"
            size="xs"
            variant="outline"
            onClick={() => navigator.clipboard.writeText(acc.account.address)}
          />

          <IconButton
            icon={<Icon as={LuExternalLink} />}
            aria-label="Open Explorer"
            size="xs"
            variant="outline"
            onClick={() => {
              const url = `${acc.connectedNetwork.blockExplorers.default.url}/address/${to}`;
              openInNewTab(url);
            }}
          />
        </HStack>
        {data !== "0x" && (
          <HStack align="start">
            <Text w={20}>Data</Text>
            <Text
              maxH="100px"
              wordBreak="break-all"
              whiteSpace="pre-wrap"
              overflowY="scroll"
            >
              {data}
            </Text>
          </HStack>
        )}
      </Stack>
      <Divider my={2} />
      <Stack p={3} border="1px solid" borderRadius="md" borderColor="gray.200">
        {eg.isFetching ? (
          <>
            <HStack>
              <Spinner size="sm" />
              <Heading size="sm">Simulating</Heading>
            </HStack>
          </>
        ) : (
          <>
            <HStack>
              <Icon as={!eg.failureReason ? LuCheckCircle : LuAlertCircle} />
              <Heading size="sm">
                Simulation {!eg.failureReason ? "Passed" : "Failed"}
              </Heading>
            </HStack>
            {eg.failureReason && (
              <Text
                whiteSpace="pre-wrap"
                overflowY="scroll"
                maxH="150px"
                fontSize="sm"
              >
                {eg.failureReason?.message}
              </Text>
            )}
          </>
        )}
      </Stack>

      <Stack p={3} border="1px solid" borderRadius="md" borderColor="gray.200">
        <HStack>
          <Icon as={LuFuel} />
          <Heading size="sm">Gas</Heading>
        </HStack>
        <HStack>
          <Text>Gas Price</Text>
          <Spacer />
          <Text fontWeight="medium" as="s">
            {numbro(formatGwei(gasPrice.data || 0n)).format({
              thousandSeparated: true,
              mantissa: 4,
              trimMantissa: true,
              optionalMantissa: true,
            })}{" "}
            Gwei
          </Text>
          <Text fontWeight="bold" bg="warning" color="white" px={1} py={0.5}>
            FREE
          </Text>
        </HStack>
      </Stack>

      <Spacer />

      <Stack position="sticky" bottom={0} pt={2} roundedTop="md" bg="white">
        <Text fontSize="sm" color="gray.400">
          Request From
        </Text>
        <HStack>
          <Image
            src={`${acc.connectedWebsite}/favicon.ico`}
            boxSize="25px"
            fallback={
              <RandomAvatar
                name={acc.connectedWebsite}
                size={25}
                mode="pattern"
              />
            }
            rounded="full"
          />
          <Text fontWeight="medium">{acc.connectedWebsite}</Text>
        </HStack>
        <Divider my={1} />
        <HStack
          sx={{
            "& > *": {
              w: "full",
            },
          }}
        >
          <Button
            colorScheme="green"
            isDisabled={eg.isFetching || !!eg.failureReason}
            isLoading={isSending}
            onClick={async () => {
              const hash = await sendMessage();
              await sendData(rId, hash);
              approve(rId);
            }}
          >
            Sign And Create
          </Button>
          <Button
            onClick={() => {
              history.addHistory(
                acc.connectedNetwork.id,
                "0x9d8ae7ad2080a01c319226c834f6fe2dde25d71a9a18ad04e3f9dcb85b74b7df"
              );
              reject(rId);
            }}
            isDisabled={isSending}
          >
            Cancel
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};
