import React from "react";
import { Flex } from "@chakra-ui/react";

import { RecentActivity } from "./RecentActivity";

export const RightPanel = () => {
  return (
    <Flex direction={"column"} gap={"48"}>
      <RecentActivity />
    </Flex>
  );
};
