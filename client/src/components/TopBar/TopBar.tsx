import { Box } from "@chakra-ui/layout";
import { Button, Flex, Stack } from "@chakra-ui/react";

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
        <Box minW="300px">Logo</Box>
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
