import { Box } from "@chakra-ui/layout";
import { Button, Flex, Image, Stack } from "@chakra-ui/react";

import reactImg from "../../assets/react.svg";
import { HamburguerMenu } from "./HamburgerMenu";
import { SearchBar } from "./SearchBar";

export const TopBar = () => {
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
          <Button variant="solid" colorScheme="red">
            Log in
          </Button>
          <HamburguerMenu />
        </Stack>
      </Flex>
    </Box>
  );
};
