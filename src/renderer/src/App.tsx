import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Grid } from "@chakra-ui/react";

import { Home } from "./components/home";
import { GettingStarted } from "./components/gettingStarted";
import { SideBar } from "./components/reusable/SideBar";
import { ProblemSet } from "./components/problemSet";
import { Problem } from "./components/problem/Problem";
import { useAppDispatch } from "./hooks/hooks";
import { loadHandle } from "./store/slices/settingsSlice";

export const App = () => {
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(loadHandle());
  }, []);

  return (
    <Grid h={"100vh"} w={"100vw"} overflow={"hidden"} templateColumns={"auto 1fr"} columnGap={"16"}>
      <HashRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Home />} />
          <Route path="/gettingstarted" element={<GettingStarted />} />
          <Route path="/problemset" element={<ProblemSet />} />
          <Route path="/problemset/problem/:id/:index" element={<Problem />} />
        </Routes>
      </HashRouter>
    </Grid>
  );
};
