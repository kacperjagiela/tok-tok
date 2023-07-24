import { Flex, Stack } from "@chakra-ui/react";

import { FeedProps } from "./Feed.types";
import { FeedCard } from "./FeedCard";

export const Feed = ({ feedType }: FeedProps) => {
  console.log("feedType:", feedType);

  return (
    <Flex
      direction="column"
      mx="auto"
      transform="translateX(-25%)"
      justifyContent="center"
      alignItems="center"
    >
      <Stack spacing={6}>
        {new Array(10).fill(0).map((_, i) => (
          <FeedCard key={i} />
        ))}
      </Stack>
    </Flex>
  );
};
