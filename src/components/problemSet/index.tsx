import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProblemSet } from "../../store/slices/cfSlice";

export const ProblemSet = () => {
  const useDispatch = useAppDispatch();
  const problemSet = useAppSelector((state) => state.cf.problemSet);

  useEffect(() => {
    useDispatch(fetchProblemSet());
  }, []);

  return <div>problem</div>;
};
