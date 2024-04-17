import { BoxProps, Container, Spinner, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAcc } from "../../stores/useAcc";
import { useRouter } from "next/router";

export const Section = (props: BoxProps) => {
  const [isLocked, noAccount] = useAcc(
    (s) => [s.isLocked, !s.account] as const
  );
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const containsLanding = router.asPath.includes("/landing");
    if ((noAccount || isLocked) && !containsLanding) {
      router.push("/landing");
    } else if (!noAccount && !isLocked && containsLanding) {
      router.push("/");
    }
  }, [router.isReady, router.asPath, noAccount, isLocked]);

  if (!router.isReady)
    return (
      <Container w="350px" h="600px" mx="auto" as={Stack}>
        <Stack align="center" justify="center" h="100%">
          <Spinner size="xl" />
        </Stack>
      </Container>
    );

  return (
    <Container
      w="350px"
      h="600px"
      mx="auto"
      py={{ base: 4, md: 10 }}
      px={{ base: 4, md: 8 }}
      overflowY="hidden"
      {...props}
    />
  );
};
