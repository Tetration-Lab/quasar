import { BoxProps, Container } from "@chakra-ui/react";

export const Section = (props: BoxProps) => {
  return (
    <Container
      w="300px"
      h="600px"
      mx="auto"
      py={{ base: 4, md: 10 }}
      px={{ base: 4, md: 8 }}
      overflowY="hidden"
      {...props}
    />
  );
};
