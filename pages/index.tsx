import type { NextPage } from 'next'
import NextLink from "next/link"
import {
  Box,
  chakra, 
  Flex, 
  HStack,
  Link,
  useColorModeValue
} from '@chakra-ui/react';

import Home from '../components/layout/Home';

const App: NextPage = () => {
  return (
    <Home>
      <Flex px={4} py={32} mx="auto" height={'100%'}>
        <Box
          mx="auto"
          w={{
            lg: 8 / 12,
            xl: 8 / 12,
          }}
        >
          <chakra.p
            mb={2}
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
            color="gray.400"
            textTransform="uppercase"
          >
            For Users
          </chakra.p>
          <chakra.h1
            mb={3}
            fontSize={{
              base: "3xl",
              md: "4xl",
            }}
            fontWeight="bold"
            lineHeight="shorter"
            color="gray.900"
            _dark={{
              color: "white",
            }}
          >
            About this app
          </chakra.h1>
          <chakra.p
            mb={5}
            color="gray.500"
            fontSize={{
              md: "lg",
            }}
          >
            This dapp is test app for donation.
            So you can send your ETH to anyone for donation, and withdraw the money received from donators into your wallet.
          </chakra.p>
          <HStack>
            <NextLink href='/donation' passHref>
              <Link
                bg={useColorModeValue('gray.100', 'blue.500')}
                rounded={'full'}
                py={3}
                px={8}
                _hover={{
                  bg: 'blue.500',
                  color: "white"
                }}
                cursor="pointer"
              >
                Donation
              </Link>
            </NextLink>
            <NextLink href='/withdraw' passHref>
              <Link
                bg={useColorModeValue('gray.100', 'blue.500')}
                rounded={'full'}
                py={3}
                px={8}
                _hover={{
                  bg: 'blue.500',
                  color: "white"
                }}
                cursor="pointer"
              >
                Withdraw
              </Link>
            </NextLink>
          </HStack>
        </Box>
      </Flex>

    </Home>
  )
}

export default App
