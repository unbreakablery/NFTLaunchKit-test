import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  useDisclosure
} from '@chakra-ui/react'
import {
  useAccount,
  useDisconnect
} from 'wagmi'
import Connector from './Connector';
import { shortAddress } from 'helpers';

const WalletConnect = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <>
      {!isConnected &&
        <Box
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          as="a"
          aria-label="Sponsor Choc UI on Open Collective"
          onClick={onOpen}
          rel="noopener noreferrer"
          bg="gray.50"
          borderWidth="1px"
          borderColor="gray.200"
          px="1em"
          minH="40px"
          rounded="md"
          fontSize="sm"
          color="gray.800"
          outline="0"
          transition="all 0.3s"
          _hover={{
            bg: "gray.100",
            borderColor: "gray.300",
            cursor: "pointer"
          }}
          _active={{
            borderColor: "gray.200",
          }}
          _focus={{
            boxShadow: "outline",
          }}
        >
          <Box as="strong" lineHeight="inherit" fontWeight="semibold">
            Connect Wallet
          </Box>
        </Box>
      }
      {isConnected &&
        <Menu>
          <MenuButton as={Button} color='gray'>
            {shortAddress(address)}
          </MenuButton>
          <MenuList>
            <MenuGroup>
              <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      }

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={10} px={8}>
            <Connector onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WalletConnect;
