import { Box } from "@chakra-ui/layout";
import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import reactImg from "../../assets/react.svg";
import { useUser } from "../../hooks/useUser";
import { HamburguerMenu } from "./HamburgerMenu";
import { SearchBar } from "./SearchBar";

interface Props {
  onLoginOpen: () => void;
}

export const TopBar = ({ onLoginOpen }: Props) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${user?.username}`);
  };

  return (
    <Box
      position="sticky"
      zIndex={1}
      top={0}
      w="100%"
      py={2}
      pl={4}
      pr={6}
      borderBottom="1px"
      borderColor="gray.300"
      backgroundColor="background"
    >
      <Flex direction="row" justifyContent="space-between">
        <Box minW="300px">
          {/* TODO: <Image objectFit="cover" src={logo} alt="TikTok" /> */}
          <Image objectFit="cover" src={reactImg} alt="Dan Abramov" />
        </Box>
        <SearchBar onSearch={() => {}} />
        <Stack direction="row">
          <Button variant="outline">Upload</Button>
          {user ? (
            <Button variant="link" colorScheme="red" onClick={goToProfile}>
              {user.username}
            </Button>
          ) : (
            <Button variant="solid" colorScheme="red" onClick={onLoginOpen}>
              Log in
            </Button>
          )}
          <HamburguerMenu />
        </Stack>
      </Flex>
    </Box>
  );
};
