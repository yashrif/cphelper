import { useEffect, useState } from "react";
import { Input, Text, Image, GridItem } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setHandle as updateHandle } from "../../store/slices/settingsSlice";
import { fetchUser } from "../../store/actions/cf/cfActions";
import { Loading } from "../../common/types";

export const Handle = () => {
  const [handle, setHandle] = useState<string | null>(null);

  const dispatch: any = useAppDispatch();

  const userPhoto = useAppSelector((state) => state.cf?.user?.titlePhoto);
  const isUserFetched = useAppSelector((state) => state.cf.loading.user === Loading.SUCCEEDED);

  useEffect(() => {
    dispatch(updateHandle(handle));

    const timer = setTimeout(() => {
      if (handle) dispatch(fetchUser(handle));
    }, 500);

    return () => clearTimeout(timer);
  }, [handle]);

  return (
    <>
      <GridItem colSpan={2} justifySelf={"center"}>
        <Image
          src={userPhoto}
          boxSize={"36"}
          borderRadius={"full"}
          opacity={isUserFetched && handle && handle?.length > 0 ? 1 : 0}
        />
      </GridItem>

      <Text fontSize={"lg"} fontWeight={"medium"} color={"font.muted"}>
        User handle:
      </Text>

      <Input
        isInvalid={handle ? (handle?.length > 0 && isUserFetched ? false : true) : false}
        placeholder="handle..."
        _placeholder={{
          color: "font.muted3"
        }}
        px={"16"}
        size={"lg"}
        borderColor={"primary.400"}
        step={5}
        maxW="3xs"
        value={handle ?? ""}
        onChange={(value) => {
          setHandle(value.target.value);
        }}
      />
    </>
  );
};
