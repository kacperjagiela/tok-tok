import { Flex } from "@chakra-ui/layout";
import { Box, useDisclosure } from "@chakra-ui/react";

import { LoginModal } from "../LoginModal/LoginModal";
import { SideBar } from "../SideBar/SideBar";
import { TopBar } from "../TopBar/TopBar";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box h="100vh">
      {isOpen ? (
        <LoginModal isOpen={isOpen} onClose={onClose} isCentered />
      ) : null}
      <TopBar onLoginOpen={onOpen} />
      <Flex minH="100vh" pt={4}>
        <SideBar onLoginOpen={onOpen} />
        {children}
      </Flex>
    </Box>
  );
};
