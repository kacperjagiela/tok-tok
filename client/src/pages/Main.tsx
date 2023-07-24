import { Flex } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";

import { Feed, FeedType } from "../components/Feed";
import { SideBar } from "../components/SideBar/SideBar";
import { TopBar } from "../components/TopBar/TopBar";

interface Props {
  feedType?: FeedType;
}

export const Main = ({ feedType }: Props) => {
  return (
    <Box h="100vh">
      <TopBar />
      <Flex minH="100vh" pt={4}>
        <SideBar />
        <Feed feedType={feedType ?? FeedType.Home} />
      </Flex>
    </Box>
  );
};
