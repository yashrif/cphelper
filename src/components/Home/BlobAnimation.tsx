import React, { useEffect } from "react";
import kute from "kute.js";

import { useAppSelector } from "../../hooks/hooks";

/* ---------------- TODO: Randomize svg's colors using state ---------------- */

export const BlobAnimation = () => {
  const profileColorPalette = useAppSelector(
    (state) => state.component.profileColorPalette
  );

  const style = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "-1",
    width: "400px",
  } as React.CSSProperties;

  useEffect(() => {
    kute
      .fromTo(
        "#blob1",
        { path: "#blob1" },
        { path: "#blob2" },
        { repeat: 99999, duration: 1200, yoyo: true }
      )
      .start();
  }, []);

  return (
    <>
      {/* Change blob color */}
      <svg
        style={style}
        className="blob"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <g transform="translate(475.4709967519736 296.333672861997)">
          <path
            id="blob1"
            d="M110.2 -107.9C149.7 -70.7 193.4 -35.4 205.1 11.8C216.9 58.9 196.9 117.9 157.4 155.2C117.9 192.5 58.9 208.3 0.1 208.1C-58.7 208 -117.4 192 -167.4 154.7C-217.4 117.4 -258.7 58.7 -259.4 -0.7C-260.1 -60.1 -220.2 -120.2 -170.2 -157.4C-120.2 -194.5 -60.1 -208.8 -12.4 -196.4C35.4 -184 70.7 -145 110.2 -107.9"
            fill={`${profileColorPalette ? profileColorPalette[1] : "#fb6f92"}`}
            // fill="#fb6f92"
          ></path>
        </g>
      </svg>

      <svg
        style={style}
        className="blob"
        viewBox="0 0 900 600"
        width="900"
        height="600"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <g
          transform="translate(453.0981342612809 260.38903302645645)"
          style={{ visibility: "hidden" }}
        >
          <path
            id="blob2"
            d="M115.4 -120.2C160 -70.7 214 -35.4 227.2 13.2C240.4 61.8 212.8 123.5 168.2 155.5C123.5 187.5 61.8 189.8 3.7 186.1C-54.4 182.4 -108.9 172.9 -143.9 140.9C-178.9 108.9 -194.4 54.4 -202.6 -8.1C-210.7 -70.7 -211.4 -141.4 -176.4 -190.9C-141.4 -240.4 -70.7 -268.7 -17.7 -251C35.4 -233.4 70.7 -169.7 115.4 -120.2"
          ></path>
        </g>
      </svg>
    </>
  );
};
