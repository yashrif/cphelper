import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { cfProblemURL, cfSubmitURL } from "../../common/utils";
import style from "./Problem.css";

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
      <Box id={`${id}${index}`} h={"full"} w={"full"} overflowY={"scroll"}>
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
