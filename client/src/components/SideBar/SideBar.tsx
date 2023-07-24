import { AtSignIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Link, Stack } from "@chakra-ui/react";

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
    <Box w={240} position="sticky" top="73px" px={2} h="calc(100vh - 57px)">
      <Stack spacing={4}>
        {links.map(({ href, label, icon: Icon }) => {
          console.log(href);
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
    </Box>
  );
};
