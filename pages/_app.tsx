import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@fontsource/poppins";
import { ChakraProvider, Box } from '@chakra-ui/react'
import CSSReset from "@chakra-ui/css-reset";
import { theme } from 'theme'

import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

// Configure chains & providers.
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

// Setting up client using the wagmi
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </ChakraProvider>
    </>
  )
}
export default MyApp
