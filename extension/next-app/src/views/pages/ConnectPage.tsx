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
import { approve, reject } from "../../stores/chrome";
import { useAcc } from "../../stores/useAcc";
import { RandomAvatar } from "react-random-avatars";

export const ConnectPage = () => {
  const router = useRouter();
  const acc = useAcc();

  const url = new URL(router.query.url as string);
  const rId = router.query.rid as string;

  return (
    <Stack h="100%">
      <Text fontWeight="medium">Connect to website</Text>
      <Box h={8} />
      <Stack align="center">
        <Image
          src={`${url.origin}/favicon.ico`}
          boxSize="50px"
          fallback={<RandomAvatar name={url.origin} size={50} mode="pattern" />}
          rounded="full"
        />
        <Text fontWeight="medium" fontSize="xl">
          {url.origin}
        </Text>
      </Stack>
      <Divider my={2} />
      <Text>This website will be able to</Text>
      <Stack
        align="center"
        fontWeight="medium"
        textAlign="center"
        fontSize="sm"
        color="gray.400"
        sx={{
          "& > *": {
            p: 2,
            rounded: "md",
            border: "1px solid",
            borderColor: "gray.200",
            w: "full",
          },
        }}
      >
        <Text>View your address</Text>
        <Text>Request your signature</Text>
        <Text>Request your transaction</Text>
      </Stack>
      <Spacer />
      <Button
        onClick={() => {
          acc.connect(url.origin);
          approve(rId);
        }}
        colorScheme="green"
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
