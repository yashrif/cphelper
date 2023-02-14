import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

export const RightPanel = () => {
  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text color="font.focused" fontSize={"2xl"} fontWeight={"semibold"}>
          Recent Activity
        </Text>
        <Text color={"blue.400"} fontSize={"md"}>
          View More
        </Text>
      </Flex>
    </Box>
  );
};
