import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes";
import { Section } from "../components/common/Section";

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  return (
    <>
      {typeof window === "undefined" || !showChild ? (
        <></>
      ) : (
        <ChakraProvider theme={theme}>
          <Section>
            <Component {...pageProps} />
          </Section>
        </ChakraProvider>
      )}
    </>
  );
};

export default App;
