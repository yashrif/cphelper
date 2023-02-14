import React, { useState, useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { CatmullRomCurve } from "react-svg-curve";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { fetchUserRatingHistory } from "../../store/cfSlice";

export const RatingCurve = () => {
  const RATIO_XY = 2;
  const SVG_PX = 32;

  const userRatingHistory = useAppSelector(
    (state) => state.cf.userRatingHistory
  );
  const ref = useRef<HTMLInputElement>(null);
  const useDispatch = useAppDispatch();
  const [graphWidth, setGraphWidth] = useState<number>(0);
  const [maxY, setMaxY] = useState<number>(0);
  const [diff, setDiff] = useState<number>(0);
  const [data, setData] = useState<[number, number][]>([]);

  useEffect(() => {
    useDispatch(fetchUserRatingHistory("Anonymous_12"));
  }, []);

  useEffect(() => {
    if (ref.current) setGraphWidth(ref.current.clientWidth);
  }, [ref]);

  useEffect(() => {
    if (userRatingHistory?.length > 0) {
      setMaxY(userRatingHistory && Math.max(...userRatingHistory));
      setDiff((graphWidth - SVG_PX) / userRatingHistory?.length);
      setData(
        userRatingHistory?.map((value, index) => [
          index * diff + 5,
          ((value || 10) * (graphWidth / RATIO_XY)) / (maxY + 10),
        ])
      );
    }
  }, [userRatingHistory]);

  return (
    <Box
      ref={ref}
      px={SVG_PX}
      py="16"
      bg="bg"
      alignItems={"center"}
      borderRadius={"2xl"}
      boxShadow={"0 0 2.4rem rgba(28, 126, 214, .1)"}
      transform={"rotateX(180deg)"}
    >
      {userRatingHistory?.length > 0 && (
        <svg width="100%" height={`${graphWidth / RATIO_XY / 10}rem`}>
          <CatmullRomCurve
            alpha={0}
            data={data}
            showPoints={true}
            strokeWidth={3}
            stroke="#7048e8"
          />
        </svg>
      )}
    </Box>
  );
};
