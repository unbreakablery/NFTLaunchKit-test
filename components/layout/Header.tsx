import React, { ReactNode } from "react";
import NextLink from 'next/link'
import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Link,
  VStack,
  chakra,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import Logo from "../Logo";
import { ColorModeSwitcher } from "components/ColorModeSwitcher";
import {
  AiOutlineMenu,
} from "react-icons/ai";
import WalletConnect from '../WalletConnect';

const NavLink = ({ children, href }: { children: ReactNode, href: string }) => (
  <NextLink href={href} passHref>
    <Link
      px={2}
      py={1}
      _hover={{
        textDecoration: 'none',
      }}
      color={useColorModeValue('gray.700', 'white')}
      fontSize={"sm"}
      fontWeight={600}
    >
      {children}
    </Link>
  </NextLink>
);

const links = [
  { name: 'Donation', href: '/donation' },
  { name: 'Withdraw', href: '/withdraw' },
];

const Header = () => {
  const mobileNav = useDisclosure();

  const bg = useColorModeValue("white", "gray.800");
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [y, setY] = React.useState(0);
  const height = ref.current ? ref.current.getBoundingClientRect() : 0;

  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost">
        Dashboard
      </Button>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
      >
        Inbox
      </Button>
      <Button w="full" variant="ghost">
        Videos
      </Button>
    </VStack>
  );
  return (
    <Box pos="relative">
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTop="6px solid"
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex w="full" h="full" px="6" align="center" justify="space-between" gap={2}>
            <Flex align="center">
              <Link href="/">
                <HStack>
                  <Logo />
                </HStack>
              </Link>
            </Flex>


            <Flex
              justify="flex-end"
              w="full"
              maxW="824px"
              align="center"
              color="gray.400"
            >
              <Flex mr={'3rem'}>
                {links.map((link, key) => (
                  <NavLink key={key} href={link.href}>{link.name}</NavLink>
                ))}
              </Flex>
              <WalletConnect />
              <ColorModeSwitcher />
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </Box>
  );
};
export default Header