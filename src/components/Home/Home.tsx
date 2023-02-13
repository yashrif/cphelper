import React, { useEffect } from "react";
import { Box, Image, Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUser } from "../../store/cfSlice";
import { BlobAnimation } from "./BlobAnimation";
import axios from "axios";

export const Home = () => {
  const useDispatch = useAppDispatch();
  const user = useAppSelector((state) => state.cf.user);

  useEffect(() => {
    useDispatch(fetchUser("yashrif"));

    axios
      .get("https://codeforces.com", {
        proxy: {
          host: "https://codeforces.com",
          port: 8050,
        },
      })
      .then((res) => console.log(res));
  }, []);

  return (
    <Box
      maxW={"container.xl"}
      h={"full"}
      margin={"0 auto"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image
        src={user?.titlePhoto}
        alt="avatar"
        boxSize={"2xs"}
        objectFit={"cover"}
        borderRadius={"full"}
      />

      {<BlobAnimation />}

      {/* <Text>{user?.firstName}</Text>
      <Text>{user?.lastName}</Text> */}
    </Box>
  );
};
