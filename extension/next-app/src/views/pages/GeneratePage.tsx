import {
  Button,
  Code,
  Divider,
  Heading,
  Icon,
  Input,
  SimpleGrid,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react";
import { english, generateMnemonic } from "viem/accounts";
import { useMemo, useState } from "react";
import { LuArrowLeft, LuCopy, LuShuffle } from "react-icons/lu";
import { useRouter } from "next/router";

export const GeneratePage = () => {
  const router = useRouter();

  const [nonce, setNonce] = useState(0);
  const [password, setPassword] = useState("");
  const mnemonic = useMemo(() => generateMnemonic(english, 256), [nonce]);

  return (
    <Stack>
      <Icon as={LuArrowLeft} onClick={() => router.push("/")} />
      <Heading size="lg">Generate New Wallet</Heading>
      <Text as="i">
        The mnemonic will be derived to{" "}
        <chakra.span as="b">Dilithium</chakra.span> keypair instead of
        Ethereum's <chakra.span as="b">Secp256k1</chakra.span> keypair
      </Text>
      <Code rounded="md" fontSize="xs">
        <SimpleGrid columns={3} p={2} spacing={1}>
          {mnemonic.split(" ").map((m) => (
            <Text>{m}</Text>
          ))}
        </SimpleGrid>
      </Code>
      <SimpleGrid columns={2} spacing={2}>
        <Button size="sm" variant="outline" leftIcon={<Icon as={LuCopy} />}>
          Copy
        </Button>
        <Button
          size="sm"
          variant="outline"
          leftIcon={<Icon as={LuShuffle} />}
          onClick={() => setNonce((i) => i + 1)}
        >
          Rerandomize
        </Button>
      </SimpleGrid>
      <Divider my={2} />
      <Heading size="md">Set Password</Heading>
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button>Generate Wallet</Button>
    </Stack>
  );
};
