import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { setAndStoreHandle, setIsHandleChanged } from "../../store/slices/settingsSlice";
import { Handle } from "../reusable/Handle";
import { setUpdatedHandle } from "@renderer/store/slices/utilsSlice";

export const Settings = () => {
  const dispatch = useAppDispatch();

  const handle = useAppSelector((state) => state.settings.handle);
  const updatedHandle = useAppSelector((state) => state.utils.updatedHandle);
  const isHandleValid = useAppSelector((state) => state.settings.isHandleValid);
  const isHandleChanged = useAppSelector((state) => state.settings.isHandleChanged);

  return (
    <Grid h={"full"} w={"full"} overflow={"hidden"} gridTemplateColumns={"1fr auto"}>
      <Box px={"16"} py={"36"} overflow={"hidden"}>
        <Box
          w={"full"}
          h={"3xs"}
          backgroundColor={"#fff4f2"}
          borderTopLeftRadius={"2rem"}
          borderTopRightRadius={"2rem"}
          overflow={"hidden"}
          position={"relative"}
          mb={"16"}
        >
          <Text
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            fontSize={"3xl"}
            fontWeight={"semibold"}
            letterSpacing={"tight"}
            color={"font.focused"}
          >
            Settings
          </Text>
        </Box>

        <Flex justifyContent={"end"} px={"36"} columnGap={"16"} opacity={isHandleChanged ? 1 : 0}>
          <Button
            isDisabled={!isHandleValid || updatedHandle === handle}
            px={"24"}
            py={"18"}
            alignSelf={"center"}
            borderRadius={"lg"}
            loadingText="Redirecting"
            backgroundColor={"primary.500"}
            _hover={{
              boxShadow: "0 1.2rem 2rem rgba(28, 127, 214, 0.75)"
            }}
            onClick={() => {
              if (updatedHandle) dispatch(setAndStoreHandle(updatedHandle));
            }}
          >
            <Text fontSize={"lg"} color={"font.light"}>
              Save
            </Text>
          </Button>

          <Button
            px={"24"}
            py={"18"}
            alignSelf={"center"}
            borderRadius={"lg"}
            loadingText="Redirecting"
            variant="outline"
            _hover={{
              boxShadow: "inset 0 0 0 .2rem rgba(28, 127, 214, 0.75)"
            }}
            onClick={() => {
              dispatch(setUpdatedHandle(handle));
              dispatch(setIsHandleChanged(false));
            }}
          >
            <Text fontSize={"lg"} color={"primary.500"}>
              Cancel
            </Text>
          </Button>
        </Flex>

        <Box display={"inline-block"}>
          <Grid
            gridTemplateColumns={"auto 1fr"}
            alignItems={"center"}
            columnGap={"24"}
            rowGap={"24"}
            mx={"auto"}
          >
            <Handle />
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};
