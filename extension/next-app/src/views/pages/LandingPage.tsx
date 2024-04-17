import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAcc } from "../../stores/useAcc";
import { useState } from "react";

export const LandingPage = () => {
  const acc = useAcc();

  return (
    <>
      <Stack align="center" justify="center" h="100%">
        <Image
          src="/next-assets/icon.png"
          alt="Quasar Logo"
          boxSize="80px"
          fill="black"
        />
        <Heading>Quasar</Heading>
        <Text>Quantum Secure Smart Account</Text>
        <Box h={4} />
        {acc.account && acc.isLocked ? <LoginSection /> : <OnboardSection />}
      </Stack>
    </>
  );
};

const LoginSection = () => {
  const acc = useAcc();
  const [password, setPassword] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          acc.unlock(password);
        }}
      >
        <Stack>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            _placeholder={{ color: "gray.400" }}
          />
          <Button isDisabled={!password} type="submit">
            Unlock
          </Button>
        </Stack>
      </form>
    </>
  );
};

const OnboardSection = () => (
  <Stack>
    <Button as={Link} href="/landing/generate">
      Generate New Wallet
    </Button>
    <Button as={Link} href="/landing/import">
      Import Seed Phrase
    </Button>
  </Stack>
);
