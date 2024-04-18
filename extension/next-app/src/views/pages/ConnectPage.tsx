import {
  Box,
  Button,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { approve, reject } from "../../stores/chrome";
import { useAcc } from "../../stores/useAcc";

export const ConnectPage = () => {
  const router = useRouter();
  const acc = useAcc();

  const url = new URL(router.query.url as string);
  const rId = router.query.rid as string;

  return (
    <Stack h="100%">
      <HStack>
        <Text>Connect to DApp</Text>
      </HStack>
      <Box h={8} />
      <Stack align="center">
        <Image src={`${url.origin}/favicon.ico`} boxSize="50px" />
        <Text fontWeight="medium" fontSize="xl">
          {url.origin}
        </Text>
      </Stack>
      <Spacer />
      <Button
        onClick={() => {
          acc.connect(url.origin);
          approve(rId);
        }}
      >
        Connect
      </Button>
      <Button
        onClick={() => {
          reject(rId);
        }}
      >
        Cancel
      </Button>
    </Stack>
  );
};
