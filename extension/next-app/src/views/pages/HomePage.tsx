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
  Stack,
  Text,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { LuLock, LuTimerReset, LuUnplug } from "react-icons/lu";
import { useAcc } from "../../stores/useAcc";
import { NImage } from "../../constants/image";
import { SelectChainMenu } from "../../components/common/SelectChainMenu";

export const HomePage = () => {
  const acc = useAcc();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <IconButton
            icon={<Icon as={LuTimerReset} />}
            aria-label="Reset"
            size="xs"
            variant="outline"
            onClick={acc.reset}
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

        <Divider my={2} />

        <Stack align="center">
          <Text fontSize="3xl" fontWeight="bold">
            {0}
            <chakra.span fontSize="lg">
              {acc.connectedNetwork.nativeCurrency.symbol}
            </chakra.span>
          </Text>
        </Stack>

        <Divider my={2} />

        <Stack>
          <Text textDecor="underline">Transaction History</Text>
          <Stack align="center">
            <Text as="i" color="gray.400" fontWeight="medium" mt={2}>
              You have no transasctions yet
            </Text>
          </Stack>
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
