import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useAcc } from "../../stores/useAcc";
import { RandomAvatar } from "react-random-avatars";

const MessageDivider = () => {
  return (
    <HStack color="gray.400" fontSize="sm">
      <Divider />
      <Text>MESSAGE</Text>
      <Divider />
    </HStack>
  );
};

export const SignPage = () => {
  const router = useRouter();
  const acc = useAcc();

  const hexMessage = router.query.hex as string; // 0x prefix
  const message = useMemo(() => {
    try {
      return hexMessage
        ? Buffer.from(hexMessage.slice(2), "hex").toString()
        : undefined;
    } catch {
      setIsUTF8(false);
      return undefined;
    }
  }, [hexMessage]);

  const [isUTF8, setIsUTF8] = useState(true);

  return (
    <Stack h="100%">
      <HStack>
        <Text fontWeight="medium">Sign Message</Text>
        <Spacer />
        <Button
          onClick={() => setIsUTF8((e) => !e)}
          size="sm"
          variant="outline"
        >
          {isUTF8 ? "UTF-8 View" : "Raw View"}
        </Button>
      </HStack>
      <Box h={2} />
      <MessageDivider />
      <Text
        p={2}
        rounded="md"
        h="50%"
        overflowY="scroll"
        border="1px solid"
        borderColor="gray.100"
      >
        {isUTF8 ? message : hexMessage}
      </Text>
      <MessageDivider />
      <Spacer />
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
        <Button colorScheme="green">Sign</Button>
        <Button>Cancel</Button>
      </HStack>
    </Stack>
  );
};
