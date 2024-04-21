import {
  Button,
  Card,
  Circle,
  Code,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Spacer,
  Spinner,
  Stack,
  Text,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { LuCopy, LuExternalLink, LuLock, LuUnplug } from "react-icons/lu";
import { useAcc } from "../../stores/useAcc";
import { NImage } from "../../constants/image";
import { SelectChainMenu } from "../../components/common/SelectChainMenu";
import { useMemo } from "react";
import { useBalance, useTransactionConfirmations } from "wagmi";
import { formatEther } from "viem";
import { openInNewTab } from "../../utils";
import { useHistory } from "../../stores/useHistory";

export const HomePage = () => {
  const acc = useAcc();
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const enabled = useMemo(() => {
    return acc.account?.chains.includes(acc.connectedNetwork.id) || false;
  }, [acc.account?.chains, acc.connectedNetwork.id]);

  const balance = useBalance({
    address: acc.account?.address,
    chainId: acc.connectedNetwork.id,
  });

  const txHistory = useMemo(() => {
    return (history.history[acc.connectedNetwork.id] || []).slice(0, 5);
  }, [history.history, acc.connectedNetwork.id]);

  if (!acc.account) {
    return (
      <Stack height="100%" align="center" justify="center">
        <Spinner size="xl" />
      </Stack>
    );
  }

  return (
    <>
      <Stack height="100%">
        <HStack>
          <Image
            src={NImage.ICON}
            alt="Quasar Logo"
            boxSize="20px"
            fill="black"
          />
          <Heading size="sm">Quasar</Heading>
          <Spacer />
          <SelectChainMenu />
        </HStack>
        <HStack>
          <Text>Welcome!</Text>
          <IconButton
            icon={<Icon as={LuLock} />}
            aria-label="Lock"
            size="xs"
            variant="outline"
            onClick={acc.lock}
          />
          <Spacer />
          <HStack
            as={Card}
            rounded="full"
            px={2}
            py={1}
            variant="outline"
            fontSize="sm"
          >
            <Circle
              size={2}
              bg={acc.connectedWebsite ? "green.400" : "red.400"}
            />
            <Text>
              {acc.connectedWebsite
                ? new URL(acc.connectedWebsite).host?.substring(0, 12)
                : "None"}
            </Text>

            {acc.connectedWebsite && (
              <IconButton
                icon={<Icon as={LuUnplug} />}
                aria-label="Disconnect"
                size="xs"
                variant="outline"
                onClick={acc.disconnect}
              />
            )}
          </HStack>
        </HStack>

        <HStack>
          <Circle size={2} bg={enabled ? "green.400" : "red.400"} />
          <Text fontWeight="medium">{acc.account.address.slice(0, 16)}...</Text>
          {enabled ? (
            <>
              <IconButton
                icon={<Icon as={LuCopy} />}
                aria-label="Copy Address"
                size="xs"
                variant="outline"
                onClick={() =>
                  navigator.clipboard.writeText(acc.account.address)
                }
              />

              <IconButton
                icon={<Icon as={LuExternalLink} />}
                aria-label="Open Explorer"
                size="xs"
                variant="outline"
                onClick={() => {
                  const url = `${acc.connectedNetwork.blockExplorers.default.url}/address/${acc.account.address}`;
                  openInNewTab(url);
                }}
              />
            </>
          ) : (
            <Button size="xs" variant="outline">
              Enable
            </Button>
          )}
        </HStack>

        <Divider my={2} />

        <Stack align="center" justify="center" height={12}>
          {enabled ? (
            balance.isFetching ? (
              <Spinner />
            ) : (
              <Text fontSize="3xl" fontWeight="bold">
                {formatEther(balance.data?.value || 0n)}
                <chakra.span fontSize="lg">
                  {acc.connectedNetwork.nativeCurrency.symbol}
                </chakra.span>
              </Text>
            )
          ) : (
            <Text fontSize="3xl">-</Text>
          )}
        </Stack>

        <Divider my={2} />

        <Stack>
          <Text textDecor="underline">Transaction History</Text>
          {txHistory.length === 0 ? (
            <Stack align="center">
              <Text as="i" color="gray.400" fontWeight="medium" mt={2}>
                You have no transasctions yet
              </Text>
            </Stack>
          ) : (
            <Stack>
              {txHistory.map((tx, i) => {
                const { data } = useTransactionConfirmations({
                  chainId: acc.connectedNetwork.id,
                  hash: tx,
                });
                const conf = data || 0n;

                return (
                  <HStack
                    key={`${tx}-${i}`}
                    rounded="md"
                    p={2}
                    border="1px solid"
                    borderColor="gray.200"
                  >
                    <Text fontWeight="medium">
                      {tx.slice(0, 6)}..{tx.slice(tx.length - 6, tx.length)}
                    </Text>
                    <Spacer />
                    <IconButton
                      icon={<Icon as={LuCopy} />}
                      aria-label="Copy Address"
                      size="xs"
                      variant="outline"
                      onClick={() => navigator.clipboard.writeText(tx)}
                    />
                    <IconButton
                      icon={<Icon as={LuExternalLink} />}
                      aria-label="Open Explorer"
                      size="xs"
                      variant="outline"
                      onClick={() => {
                        const url = `${acc.connectedNetwork.blockExplorers.default.url}/tx/${tx}`;
                        openInNewTab(url);
                      }}
                    />
                    <Circle
                      size="12px"
                      bg={conf >= 1 ? "green.400" : "red.400"}
                    />
                  </HStack>
                );
              })}
            </Stack>
          )}
        </Stack>

        <Spacer />

        <HStack>
          <Button onClick={onOpen} size="sm">
            View Dilithium Public Keyy
          </Button>
        </HStack>
      </Stack>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h="50%">
          <DrawerHeader>Dilithium Public Key</DrawerHeader>
          <DrawerBody>
            <Code p={2} rounded="md" whiteSpace="pre-wrap" w="full">
              {JSON.stringify(JSON.parse(acc.account.epk), null, 2)}
            </Code>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
