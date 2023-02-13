import React from "react";
import { Box } from "@chakra-ui/react";

import { Home } from "./Home/Home";

export const App = () => {
  return (
    <Box height={"100vh"} margin={"0 auto"} overflow={"hidden"}>
      <Home />
    </Box>
  );
};
