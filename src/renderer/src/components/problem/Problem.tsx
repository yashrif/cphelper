import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";

import { cfProblemURL, cfSubmitURL } from "../../common/utils";
import style from "./Problem.css?inline";

export const Problem = () => {
  const { id, index } = useParams();

  const refProblem = useRef<any>(null);
  const refSubmit = useRef<any>(null);

  const [isSpinner, setIsSpinner] = useState(true);

  useEffect(() => {
    refProblem?.current?.addEventListener("dom-ready", () => {
      refProblem?.current?.insertCSS(style);
    });

    refSubmit?.current?.addEventListener("dom-ready", () => {
      refSubmit?.current?.insertCSS(style);
      refSubmit?.current?.insertCSS(`#header{ display: none !important }`);
    });
  }, []);

  useEffect(() => {
    if (refProblem?.current) setIsSpinner(false);
    true;
  }, [refProblem]);

  return (
    <>
      <style>
        {`
            ::-webkit-scrollbar {
                display: none;
              }
        `}
      </style>
      <Box id={`${id}${index}`} h={"full"} w={"full"} overflowY={"scroll"} position={"relative"}>
        {isSpinner && (
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
          id="problemView"
          ref={refProblem}
          src={`${cfProblemURL}/${id}/${index}`}
          style={{ height: "100%", width: "100%" }}
        ></webview>
        <webview
          id="submitView"
          ref={refSubmit}
          src={cfSubmitURL}
          style={{ height: "100%", width: "100%" }}
        ></webview>
      </Box>
    </>
  );
};
