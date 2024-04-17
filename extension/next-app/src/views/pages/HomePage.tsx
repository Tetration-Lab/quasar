import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Section } from "../../components/common/Section";
import Link from "next/link";

export const HomePage = () => {
  return (
    <>
      <Stack align="center" justify="center" h="100%">
        <Heading>🛰️</Heading>
        <Heading>Quasar</Heading>
        <Text>Quantum Secure Smart Account</Text>
        <Box h={4} />
        <Button as={Link} href="/generate">
          Generate New Wallet
        </Button>
        <Button>Import Seed Phrase</Button>
      </Stack>
    </>
  );
};
