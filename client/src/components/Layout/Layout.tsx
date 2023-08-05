import { Flex } from "@chakra-ui/layout";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import { RoutesEnum } from "../../routes";
import { Nullable } from "../../types/Nullable";
import { LoginModal } from "../LoginModal/LoginModal";
import { SideBar } from "../SideBar/SideBar";
import { TopBar } from "../TopBar/TopBar";

interface Props {
  children: React.ReactNode;
  hideSideBar?: boolean;
}

export const Layout = ({ children, hideSideBar }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [navigateOnLogin, setNavigateOnLogin] =
    useState<Nullable<RoutesEnum>>(null);

  const onFinish = () => {
    onClose();
    setNavigateOnLogin(null);
  };

  const onLoginOpen = (navigateOnLogin?: RoutesEnum) => {
    setNavigateOnLogin(navigateOnLogin ?? null);
    onOpen();
  };

  return (
    <Box h="100vh">
      {isOpen ? (
        <LoginModal
          isOpen={isOpen}
          onClose={onFinish}
          navigateOnLogin={navigateOnLogin}
          isCentered
        />
      ) : null}
      <TopBar onLoginOpen={onLoginOpen} />
      <Flex minH="100vh" pt={4}>
        {hideSideBar ? null : <SideBar onLoginOpen={onOpen} />}
        {children}
      </Flex>
    </Box>
  );
};
