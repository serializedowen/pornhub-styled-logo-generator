import React, { useRef, useCallback, useState, useEffect } from "react";
import useConfig from "src/hooks/useConfig";
import download from "src/utils/download";
import { IconButton, makeStyles, createStyles } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
const useStyles = makeStyles(
  createStyles({
    root: {
      position: "relative",
    },

    exportPanel: {
      visibility: "hidden",
      transition: "1s",
      position: "absolute",
      top: "50%",
      left: "50%",
      opacity: 0,
      transform: "translate(-50%, -50%)",
    },

    renderer: {
      "&:hover, & $exportPanel": {
        opacity: 1,
        visibility: "visible",
      },
    },
  })
);

export default function SvgRenderer({
  content,
  splitIndex,
  setexportMethod,
}: IRendererProps) {
  const { width, height, leftWidth, rightWidth } = useConfig({
    content,
    splitIndex,
  });
  const svgRef = useRef<SVGSVGElement>(null);

  const classes = useStyles();
  const exportFunction = useCallback(() => {
    if (svgRef.current) {
      download(svgRef.current.outerHTML, "logo.svg");
    }
  }, []);

  useEffect(() => {
    setexportMethod(() => exportFunction);
    return () => {
      setexportMethod(() => () => {});
    };
  }, [exportFunction, setexportMethod]);

  return (
    <div className={classes.root}>
      {/* {showButton && (
      <IconButton
        onClick={exportFunction}
        color="primary"
        component="span"
        className={classes.exportPanel}
      >
        <GetAppIcon></GetAppIcon>
      </IconButton>
      )} */}

      <svg
        width={width}
        height={height}
        ref={svgRef}
        className={classes.renderer}
      >
        <rect
          width={width}
          height={height}
          style={{
            fill: "rgb(0,0,0)",
          }}
        />

        <rect
          x={width / 2}
          y={height * 0.2}
          rx="10"
          ry="10"
          width={rightWidth}
          height={height * 0.6}
          style={{
            fill: "rgb(253,112,11)",
          }}
        ></rect>
        <text
          fill="rgb(255,255,255)"
          fontSize="80"
          fontFamily="Arial"
          alignmentBaseline="middle"
          x={width / 2}
          y={height / 2}
          textAnchor="end"
        >
          {content.substring(0, splitIndex)}
        </text>
        <text
          fill="rgb(0,0,0)"
          fontSize="80"
          fontFamily="Arial"
          alignmentBaseline="middle"
          x={width / 2}
          y={height / 2}
        >
          {content.substring(splitIndex)}
        </text>
      </svg>
    </div>
  );
}
