import {
  Button,
  Code,
  Divider,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
  chakra,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useAcc } from "../../stores/useAcc";

export const ImportPage = () => {
  const router = useRouter();
  const acc = useAcc();

  const [mnemonicInput, setMnemonicInput] = useState("");
  const [password, setPassword] = useState("");

  const imp = useCallback(() => {
    const mnemonic = mnemonicInput.split(" ");
    if (mnemonic.length !== 24) {
      return;
    }
    acc.setAccount({
      mnemonic: mnemonic.join(" "),
      password,
    });
  }, [mnemonicInput, password, router]);

  return (
    <Stack>
      <Icon as={LuArrowLeft} onClick={() => router.back()} />
      <Heading size="lg">Import Wallet</Heading>
      <Text>
        Import existing wallet using 24-word mnemonic phrase.{" "}
        <chakra.span as="i" color="gray.500">
          You{" "}
          <chakra.span as="b" color="error">
            SHOULD NOT USE
          </chakra.span>{" "}
          the same mnemonic phrase as your exsiting Ethereum wallet.
        </chakra.span>
      </Text>
      <Code rounded="md">
        <Textarea
          h="130px"
          fontSize="xs"
          placeholder="Paste your 24-word mnemonic phrase here."
          _placeholder={{
            color: "gray.400",
            fontSize: "xs",
          }}
          onChange={(e) => setMnemonicInput(e.target.value)}
        />
      </Code>
      <Divider my={2} />
      <Heading size="md">Set Password</Heading>
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      <Button
        onClick={imp}
        isDisabled={mnemonicInput.length === 0 || password.length === 0}
      >
        Import Wallet
      </Button>
    </Stack>
  );
};
