import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Section } from "../../components/common/Section";
import Link from "next/link";

export const HomePage = () => {
  return (
    <>
      <Stack align="center" justify="center" h="100%">
        <Image src="/icon.png" alt="Quasar Logo" boxSize="80px" fill="black" />
        <Heading>Quasar</Heading>
        <Text>Quantum Secure Smart Account</Text>
        <Box h={4} />
        <Button as={Link} href="/generate">
          Generate New Wallet
        </Button>
        <Button as={Link} href="/import">
          Import Seed Phrase
        </Button>
      </Stack>
    </>
  );
};
