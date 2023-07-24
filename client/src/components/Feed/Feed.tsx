import { Flex } from "@chakra-ui/react";

import { FeedProps } from "./Feed.types";
import { FeedCard } from "./FeedCard";

export const Feed = ({ feedType }: FeedProps) => {
  console.log("feedType:", feedType);

  return (
    <Flex direction="column" align="center">
      {new Array(10).fill(0).map((_, i) => (
        <FeedCard key={i} />
      ))}
    </Flex>
  );
};
