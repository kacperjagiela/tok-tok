import { AtSignIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Button, Link, Stack, StackDivider, Text } from "@chakra-ui/react";

export const SideBar = () => {
  const links = [
    {
      href: "/",
      label: "For You",
      icon: StarIcon,
    },
    {
      href: "/following",
      label: "Following",
      icon: ViewIcon,
    },
    {
      href: "/mentions",
      label: "Mentions",
      icon: AtSignIcon,
    },
  ];

  return (
    <Box w={240} position="sticky" top="73px" px={3} h="calc(100vh - 57px)">
      <Stack spacing={6} divider={<StackDivider borderColor="gray.200" />}>
        <Stack spacing={4}>
          {links.map(({ href, label, icon: Icon }) => {
            return (
              <Link
                key={label}
                p={2}
                fontWeight={600}
                display="inline-flex"
                alignItems="center"
                href={href}
                fontSize="xl"
                _hover={{
                  bgColor: "gray.100",
                }}
              >
                <Icon mr={2} />
                {label}
              </Link>
            );
          })}
        </Stack>
        <Box>
          <Text
            pl={2}
            mb={6}
            fontWeight={500}
            fontSize="medium"
            colorScheme="gray"
          >
            Log in to follow creators, like videos, and view comments.
          </Text>
          <Button w="100%" colorScheme="red" variant="outline">
            Log in
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
