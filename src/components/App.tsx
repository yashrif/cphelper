import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchProblems } from "../store/cfSlice";

export const App = () => {
  const problems = useAppSelector((state) => state.problemList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProblems());
  }, []);

  console.log(problems);

  return (
    <div>
      <div>App</div>
      <div>Hello World</div>
    </div>
  );
};
