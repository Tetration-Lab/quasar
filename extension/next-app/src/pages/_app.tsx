import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes";
import { Section } from "../components/common/Section";
import Head from "next/head";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../constants/web3";
import { NImage } from "../constants/image";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  return (
    <>
      <Head>
        <title>Quasar</title>
        <meta name="description" content="Quantum Secure Smart Account" />
        <link rel="icon" type="image/png" href={NImage.ICONBG} />
      </Head>
      {typeof window === "undefined" || !showChild ? (
        <></>
      ) : (
        <ChakraProvider theme={theme}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <Section>
                <Component {...pageProps} />
              </Section>
            </QueryClientProvider>
          </WagmiProvider>
        </ChakraProvider>
      )}
    </>
  );
};

export default App;
