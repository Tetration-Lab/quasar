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
import { useEstimateGas, useGasPrice } from "wagmi";
import {
  Address,
  Hex,
  checksumAddress,
  formatEther,
  formatGwei,
  fromHex,
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
import { approve, reject } from "../../stores/chrome";

export const SendPage = () => {
  const router = useRouter();
  const to = checksumAddress(router.query.to as Address);
  const data = router.query.data as string;
  const value = fromHex(router.query.value as Hex, "bigint");
  const rId = router.query.rid as string;

  const acc = useAcc();
  const price = usePrice();

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

  return (
    <Stack h="100%" overflowY="scroll">
      <Text fontWeight="medium">Sign Transaction</Text>
      <Box h={4} />
      <Heading size="md">{data === "0x" ? `Send Token` : "Call"}</Heading>
      <Stack fontWeight="medium">
        <HStack align="start">
          <Text w={20}>Value</Text>
          <Stack spacing={0}>
            <Text>
              {formatEther(value)} {acc.connectedNetwork.nativeCurrency.symbol}
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
            onClick={() => {
              approve(rId);
            }}
          >
            Sign And Create
          </Button>
          <Button onClick={() => reject(rId)}>Cancel</Button>
        </HStack>
      </Stack>
    </Stack>
  );
};
