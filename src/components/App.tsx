import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Grid } from "@chakra-ui/react";

import { Home } from "./home";
import { SideBar } from "./reusable/SideBar";
import { ProblemSet } from "./problemSet";

export const App = () => {
  return (
    <Grid
      h={"100vh"}
      w={"100vw"}
      py={"36"}
      px={"16"}
      overflow={"hidden"}
      templateColumns={"auto 1fr"}
      columnGap={"16"}
    >
      <HashRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problemset" element={<ProblemSet />} />
        </Routes>
      </HashRouter>
    </Grid>
  );
};
