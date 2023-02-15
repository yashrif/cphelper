import React, { useEffect } from "react";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoTimerOutline, IoCloseCircleOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUserStatus } from "../../store/cfSlice";
import { Loading, Submission, Verdict } from "../../common/types";

export const RecentActivity = () => {
  const userStatus = useAppSelector((state) => state.cf.userStatus);
  const isUserStatusLoading = useAppSelector(
    (state) => state.cf.loading.userStatus
  );
  const useDispatch = useAppDispatch();

  useEffect(() => {
    useDispatch(fetchUserStatus("Anonymous_12"));
  }, []);

  const secondsToDate = (sec: number) => {
    const t = new Date(1970, 0, 1);
    t.setSeconds(sec);
    return t;
  };

  const renderVerdictIcon = (verdict: keyof typeof Verdict) => {
    return Verdict[verdict] === Verdict.OK ? (
      <IoMdCheckmarkCircleOutline color="#37b24d" size={"2.4rem"} />
    ) : (
      <IoCloseCircleOutline color="#f03e3e" size={"2.4rem"} />
    );
  };

  const renderActivityList = (activities: Submission[]) => {
    return activities.map((activity) => (
      <Flex
        boxShadow={"0 0.4rem 1.2rem rgba(28, 126, 214, .08)"}
        borderRadius={"md"}
        px={"12"}
        py={"8"}
        key={activity.id}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Text fontSize={"lg"} fontWeight={"medium"} lineHeight={"tall"}>
            {activity.problem.name.slice(0, 20)}
            {activity.problem.name.length > 20 ? "..." : null}
          </Text>
          <Flex gap={"4"} alignItems={"center"}>
            <IoTimerOutline color={"#fd7e14"} size={"1.2rem"} />
            <Text fontSize={"md"} color={"font.muted2"}>
              {secondsToDate(activity.creationTimeSeconds).toDateString()}
            </Text>
          </Flex>
        </Box>
        <Box>{renderVerdictIcon(activity.verdict)}</Box>
      </Flex>
    ));
  };

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={"16"}>
        <Text color="font.focused" fontSize={"2xl"} fontWeight={"semibold"}>
          Recent Activity
        </Text>
        <Text color={"blue.400"} fontSize={"md"}>
          View More
        </Text>
      </Flex>

      {isUserStatusLoading === Loading.SUCEEDED && (
        <Stack gap={"8"}>{renderActivityList(userStatus)}</Stack>
      )}
    </Box>
  );
};
