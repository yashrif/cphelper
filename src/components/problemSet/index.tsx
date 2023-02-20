import React from "react";
import { Box, Grid } from "@chakra-ui/react";

import { ProblemTable } from "./ProblemTable";
import { ProblemFilter } from "./ProblemFilter";

export const ProblemSet = () => {
  return (
    <Grid
      h={"full"}
      w={"full"}
      overflow={"hidden"}
      gridTemplateColumns={"1fr auto"}
      // columnGap={"24"}
    >
      <Box px={"16"} py={"36"}>
        <ProblemTable />
      </Box>

      <Box minW={"md"} maxW={"lg"} px={"16"} py={"36"}>
        <ProblemFilter />
      </Box>
    </Grid>
  );
};
