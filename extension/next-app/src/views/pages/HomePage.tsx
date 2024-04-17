import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuLock, LuTimerReset } from "react-icons/lu";
import { useAcc } from "../../stores/useAcc";

export const HomePage = () => {
  const acc = useAcc();

  return (
    <>
      <Stack>
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
      </Stack>
    </>
  );
};
