import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast
} from '@chakra-ui/react';
import Home from 'components/layout/Home';
import { utils } from 'ethers';
import { useAccount, useContract, useSigner, useBalance } from 'wagmi';
import contractABI from '../../data/contractABI.json';
import { CONTRACT_ADDRESS } from 'helpers/constants';

const Donation: NextPage = () => {
  const toast = useToast();
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();
  const { data: walletBalance, isError, isLoading } = useBalance({
    addressOrName: address,
  });
  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractABI,
    signerOrProvider: signer,
  });

  const [balance, setBalance] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isNotAvailable, setIsNotAvailable] = useState(false);

  const getBalance = async () => {
    if (!isConnected) {
      setHasError(true);
      setErrorMsg('Please connect to your wallet');
      return;
    }

    try {
      await contract.recipients(address)
        .then((recipientBalance: any) => {
          setBalance(Number(utils.formatEther(recipientBalance)));
        });
    } catch (error) {
      setHasError(true);
      setErrorMsg('Error while getting your balance');
    }
  }

  useEffect(() => {
    if (hasError) {
      toast({
        title: 'Error',
        description: errorMsg,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });

      setHasError(false);
      setErrorMsg('');
    }
  }, [hasError]);

  useEffect(() => {
    if (address && contract.provider) {
      getBalance();
    }
  }, [address, contract]);

  useEffect(() => {
    if (balance > 0) {
      setIsNotAvailable(false);
    } else {
      setIsNotAvailable(true);
    }
  }, [balance]);

  const withdraw = async (e: any) => {
    e.preventDefault();

    if (!isConnected || !address) {
      setHasError(true);
      setErrorMsg('Please connect to your wallet');
      return;
    }

    if (isNotAvailable) {
      setHasError(true);
      setErrorMsg('Not enough balance to withdraw');
      return;
    }

    setIsWithdrawing(true);

    try {
      await contract.withdraw()
        .then((result: any) => {
          setHasError(false);
          setErrorMsg('');
          setBalance(0);
          
          toast({
            title: 'Withdraw',
            description: "Withdrawed successfully, Please check your balance on wallet!",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
        });
    } catch (error) {
      setHasError(true);
      setErrorMsg('Error while calling withdraw function of contract');
    }

    setIsWithdrawing(false);
  }

  return (
    <Home>
      <Flex justifyContent={'center'}>
        <Box
          bg={useColorModeValue('gray.50', 'gray.900')}
          color={useColorModeValue('gray.900', 'white')}
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Withdraw</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Do you want to withdraw?
                  </Text>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your balance in wallet: <strong>{isError ? 'Error fetching balance' : isLoading ? 'Fetching balance...' : parseFloat(walletBalance?.formatted == undefined ? '0' : walletBalance?.formatted).toFixed(4)} {walletBalance?.symbol}</strong></FormLabel>
                        <FormLabel>Your available balance to withdraw from donations: <strong>{balance}</strong> ETH</FormLabel>
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          width={'100%'}
                          bg="#0D74FF"
                          color="white"
                          onClick={(e) => withdraw(e)}
                          isLoading={isWithdrawing}
                          loadingText='Processing'
                          isDisabled={!isConnected || isNotAvailable}
                          _hover={{}}>
                          {isWithdrawing ? 'Processing...' : 'Withdraw'}
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Home>
  );
};

export default Donation;
