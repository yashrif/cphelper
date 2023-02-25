import React, { useEffect } from "react";
import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoTimerOutline, IoCloseCircleOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Loading, Submission, Verdict } from "../../common/types";
import { fetchUserStatus } from "../../store/actions/cf/cfApiActions";

export const RecentActivity = () => {
  const dispatch = useAppDispatch();

  const handle = useAppSelector((state) => state.settings.handle);
  const userStatus = useAppSelector((state) => state.cf.userStatus);
  const isUserStatusLoaded = useAppSelector(
    (state) => state.cf.loading.userStatus
  );

  useEffect(() => {
    if (handle) dispatch(fetchUserStatus(handle));
  }, [handle]);

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

  const renderSkeleton = (count: number) => {
    const renderList: JSX.Element[] = [];

    for (let i = 0; i < count; i++)
      renderList.push(
        <Skeleton
          key={i + 1}
          baseColor={"#dbedff"}
          height={"5.2rem"}
          width={"100%"}
          borderRadius={".5rem"}
        />
      );

    return renderList;
  };

  const renderActivityList = (activities: Submission[]) => {
    return activities.map((activity) => (
      <Flex
        boxShadow={"0 0 1.2rem rgba(28, 126, 214, 0.1)"}
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
        <Text color={"primary.500"} fontSize={"md"}>
          View More
        </Text>
      </Flex>

      <Stack gap={"0.4rem"}>
        {isUserStatusLoaded === Loading.SUCCEEDED
          ? renderActivityList(userStatus)
          : renderSkeleton(5)}
      </Stack>
    </Box>
  );
};
