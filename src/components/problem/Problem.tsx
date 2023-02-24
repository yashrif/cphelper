import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";

import { cfProblemURL, cfSubmitURL } from "../../common/utils";
import style from "./Problem.css?inline";

export const Problem = () => {
  const { id, index } = useParams();

  const refProblem = useRef<Electron.WebviewTag>(null);
  const refSubmit = useRef<Electron.WebviewTag>(null);

  useEffect(() => {
    refProblem?.current?.addEventListener("dom-ready", () => {
      refProblem?.current?.insertCSS(style);
    });

    refSubmit?.current?.addEventListener("dom-ready", () => {
      refSubmit?.current?.insertCSS(style);
    });
  }, []);

  return (
    <>
      <style>
        {`
            ::-webkit-scrollbar {
                display: none;
              }
        `}
      </style>
      <Box
        id={`${id}${index}`}
        h={"full"}
        w={"full"}
        overflowY={"scroll"}
        position={"relative"}
      >
        {!refProblem.current && (
          <Box height={"100vh"} width={"full"} position={"absolute"}>
            <Spinner
              position={"absolute"}
              top={"50%"}
              left={"50%"}
              transform={"translate(-50%, -50%)"}
              thickness=".3rem"
              speed="0.5s"
              emptyColor="primary.100"
              color="primary.500"
              size="xl"
            />
          </Box>
        )}
        <webview
          ref={refProblem}
          src={`${cfProblemURL}/${id}/${index}`}
          style={{ height: "100%", width: "100%" }}
        ></webview>
        <webview
          ref={refSubmit}
          src={cfSubmitURL}
          style={{ height: "100%", width: "100%" }}
        ></webview>
      </Box>
    </>
  );
};
