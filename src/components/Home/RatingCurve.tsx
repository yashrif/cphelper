import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { fetchUserRatingHistory } from "../../store/cfSlice";
import { Loading } from "../../common/types";

export const RatingCurve = () => {
  const ANIMATION_DURATION = 2500;
  const userRatingHistory = useAppSelector(
    (state) => state.cf.userRatingHistory
  );
  const isUserRatingHistory = useAppSelector(
    (state) => state.cf.loading.userRatingHistory
  );
  const useDispatch = useAppDispatch();
  const [isShowGraph, setIsShowGraph] = useState(false);
  const [isShowDots, setIsShowDots] = useState(false);

  useEffect(() => {
    useDispatch(fetchUserRatingHistory("Anonymous_12"));
  }, []);

  useEffect(() => {
    const graphTimer = setTimeout(() => setIsShowGraph(true), 500);
    const graphDotTimer = setTimeout(
      () => setIsShowDots(true),
      1000 + ANIMATION_DURATION
    );

    return () => {
      clearTimeout(graphTimer);
      clearTimeout(graphDotTimer);
    };
  }, [isUserRatingHistory]);

  return (
    <Box
      px={"32"}
      py={"16"}
      bg={"bg"}
      alignItems={"center"}
      borderRadius={"lg"}
      boxShadow={"0 0 2.4rem rgba(28, 126, 214, .1)"}
      h={"300px"}
    >
      {/* TODO: Add custom tooltip and legend */}
      {isShowGraph && isUserRatingHistory === Loading.SUCEEDED && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userRatingHistory}>
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="newRating"
              stroke="#8884d8"
              strokeWidth={2.5}
              activeDot={{ r: 6 }}
              dot={{ r: 3 }}
              shapeRendering={"dot"}
              isAnimationActive={!isShowDots}
              animationDuration={ANIMATION_DURATION}
              animationEasing={"linear"}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};
