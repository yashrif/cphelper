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
      columnGap={"32"}
      pr={"16"}
    >
      <ProblemTable />
      <Box minW={"md"} maxW={"lg"}>
        <ProblemFilter />
      </Box>
    </Grid>
  );
};
