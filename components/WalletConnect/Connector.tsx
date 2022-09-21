import {
  useConnect,
} from "wagmi";
import {
  Grid,
  GridItem,
  Button,
  useToast
} from '@chakra-ui/react'
import MetamaskIcon from "./MetamaskIcon";
import CoinbaseWalletIcon from "./CoinbaseWalletIcon";
import { useEffect } from "react";

const Connector = (props: { onClose: () => void }) => {
  const { onClose } = props;
  const toast = useToast()

  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  //Connect wallet action
  const handleConnect = (connector: any) => {
    connect({ connector })
    if (!isLoading) {
      onClose()
    }
  }

  //Display the errors when connect wallet
  useEffect(() => {
    if (!error) {
      return
    }
    toast({
      title: error.name,
      description: error.message,
      status: 'error',
      duration: 9000,
      isClosable: true,
      variant: 'left-accent',
      position: 'top-right'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <Grid templateColumns='1fr 1fr' gap={8}>
      {connectors.map((connector) => (
        <GridItem w='100%' key={connector.id}>
          <Button
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            height={"auto"}
            alignItems="center"
            py={4}
            colorScheme='gray'
            variant='ghost'
            disabled={!connector.ready}
            onClick={() => handleConnect(connector)}
            isLoading={(isLoading && connector.id === pendingConnector?.id) ? true : false}
          >
            {connector.name === "MetaMask" &&
              <MetamaskIcon />
            }
            {connector.name === "Coinbase Wallet" &&
              <CoinbaseWalletIcon />
            }
          </Button>
        </GridItem>
      ))}
    </Grid>

  )
}
export default Connector;