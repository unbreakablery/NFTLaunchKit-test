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
import { utils } from 'ethers';
import Home from 'components/layout/Home';
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

  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('0.01');
  const [hasError, setHasError] = useState<boolean>(false);
  const [isDonating, setIsDonating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleRecipientChange = (address: string) => setRecipient(address);
  const handleAmountChange = (amount: string) => setAmount(amount);

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

  const donate = async (e: any) => {
    e.preventDefault();

    if (!isConnected) {
      setHasError(true);
      setErrorMsg('Please connect to your wallet');
      return;
    }

    if (!utils.isAddress(recipient)) {
      setHasError(true);
      setErrorMsg('Invalid Address Type');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setHasError(true);
      setErrorMsg('Invalid Amount');
      return;
    }

    setIsDonating(true);

    try {
      await contract.donate(recipient, {
        value: utils.parseEther(amount),
      }).then((result: any) => {
        setHasError(false);
        setErrorMsg('');
        
        toast({
          title: 'Donated',
          description: "Thanks, donated successfully!",
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
      });
    } catch (error) {
      setHasError(true);
      setErrorMsg('Error while calling donate function of contract');
    }

    setIsDonating(false);
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
                  <Heading>Donate</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the address and amount to donate
                  </Text>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your balance in wallet: <strong>{isError ? 'Error fetching balance' : isLoading ? 'Fetching balance...' : parseFloat(walletBalance?.formatted == undefined ? '0' : walletBalance?.formatted).toFixed(4)} {walletBalance?.symbol}</strong></FormLabel>
                        <FormLabel>Recipient Address</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                          />
                          <Input 
                            type="text" 
                            size="md" 
                            value={recipient} 
                            onChange={(e) => handleRecipientChange(e.target.value)}
                            required
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Amount (ETH)</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                          />
                          <NumberInput 
                            value={amount} 
                            defaultValue={0.01} 
                            min={0} 
                            precision={2} 
                            step={0.01} 
                            onChange={handleAmountChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          width={'100%'}
                          bg="#0D74FF"
                          color="white"
                          onClick={(e) => donate(e)}
                          isLoading={isDonating}
                          loadingText='Processing'
                          isDisabled={!isConnected}
                          _hover={{}}>
                          {isDonating ? 'Processing...' : 'Donate'}
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
