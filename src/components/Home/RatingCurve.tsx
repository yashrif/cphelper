import React, { useState, useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAppSelector } from "../../hooks/hooks";
import { Loading } from "../../common/types";

export const RatingCurve = () => {
  const GRAPH_ANIMATION_DELAY = 500;
  const GRAPH_ANIMATION_DURATION = 2500;
  const userRatingHistory = useAppSelector(
    (state) => state.cf.userRatingHistory
  );
  const isUserRatingHistory = useAppSelector(
    (state) => state.cf.loading.userRatingHistoryAndStatus
  );
  const [isShowGraph, setIsShowGraph] = useState(false);
  // const [isShowDots, setIsShowDots] = useState(false);

  useEffect(() => {
    const graphTimer = setTimeout(() => {
      // setIsShowDots(false);
      setIsShowGraph(true);
    }, GRAPH_ANIMATION_DELAY);

    // const graphDotTimer = setTimeout(
    //   () => setIsShowDots(true),
    //   GRAPH_ANIMATION_DELAY + GRAPH_ANIMATION_DURATION + 100
    // );

    return () => {
      clearTimeout(graphTimer);
      // clearTimeout(graphDotTimer);
    };
  }, [isUserRatingHistory]);

  return (
    /*
      TODO: Add custom tooltip and legend
      Rerender with the changes of app width
    */
    <Box
      alignItems={"center"}
      bg={"bg"}
      borderRadius={"lg"}
      boxShadow={"0rem 0rem 3.2rem rgba(28, 126, 214, .1)"}
      h={"300px"}
      px={"32"}
      py={"16"}
      w={"full"}
      position={"relative"}
    >
      {isShowGraph && isUserRatingHistory === Loading.SUCCEEDED ? (
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
              dot={{ r: userRatingHistory?.length > 20 ? 2 : 3 }}
              shapeRendering={"dot"}
              // isAnimationActive={!isShowDots}
              animationDuration={GRAPH_ANIMATION_DURATION}
              animationEasing={"linear"}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        >
          <Spinner
            thickness=".3rem"
            speed="0.5s"
            emptyColor="primary.100"
            color="primary.500"
            size="xl"
          />
        </Box>
      )}
    </Box>
  );
};
