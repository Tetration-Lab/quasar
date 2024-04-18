import {
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuLock, LuTimerReset, LuUnplug } from "react-icons/lu";
import { useAcc } from "../../stores/useAcc";
import { NImage } from "../../constants/image";

export const HomePage = () => {
  const acc = useAcc();

  return (
    <>
      <Stack>
        <HStack>
          <Image
            src={NImage.ICON}
            alt="Quasar Logo"
            boxSize="20px"
            fill="black"
          />
          <Heading size="sm">Quasar</Heading>
        </HStack>
        <HStack>
          <Text>Welcome!</Text>
          <IconButton
            icon={<Icon as={LuLock} />}
            aria-label="Lock"
            size="sm"
            variant="outline"
            onClick={acc.lock}
          />
          <IconButton
            icon={<Icon as={LuTimerReset} />}
            aria-label="Reset"
            size="sm"
            variant="outline"
            onClick={acc.reset}
          />
        </HStack>
        <HStack>
          <Text>Connected: {acc.connectedWebsite || "None"}</Text>
          <IconButton
            icon={<Icon as={LuUnplug} />}
            aria-label="Disconnect"
            size="sm"
            variant="outline"
            onClick={acc.disconnect}
          />
        </HStack>
      </Stack>
    </>
  );
};
