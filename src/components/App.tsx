import React from "react";
import { Grid } from "@chakra-ui/react";

import { Home } from "./Home/Home";
import { SideBar } from "./reusable/SideBar";

export const App = () => {
  return (
    <Grid
      height={"100vh"}
      py={"36"}
      px={"36"}
      mx={"auto"}
      overflowX={"hidden"}
      templateColumns={"2fr 11fr"}
      columnGap={"36"}
    >
      <SideBar />
      <Home />
    </Grid>
  );
};
