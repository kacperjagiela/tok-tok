import { Box } from "@chakra-ui/layout";
import { Button, Flex, Stack } from "@chakra-ui/react";

import { HamburguerMenu } from "./HamburgerMenu";
import { SearchBar } from "./SearchBar";

export const TopBar = () => {
  return (
    <Box
      w="100%"
      py={2}
      pl={4}
      pr={6}
      borderBottom="1px"
      borderColor="gray.300"
    >
      <Flex direction="row" justifyContent="space-between">
        <Box minW="300px">Logo</Box>
        <SearchBar onSearch={() => {}} />
        <Stack direction="row">
          <Button>Upload</Button>
          <Button>Log In</Button>
          <HamburguerMenu />
        </Stack>
      </Flex>
    </Box>
  );
};
