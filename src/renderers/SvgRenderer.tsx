import React, { useRef, useCallback } from "react";
import useConfig from "src/hooks/useConfig";
import download from "src/utils/download";
import { Button } from "@material-ui/core";

export default function SvgRenderer({ content, splitIndex }: IRendererProps) {
  const { width, height, leftWidth, rightWidth } = useConfig({
    content,
    splitIndex,
  });
  const svgRef = useRef<SVGSVGElement>(null);

  const exportFunction = useCallback(() => {
    if (svgRef.current) {
      console.log(svgRef.current.outerHTML);
      download(svgRef.current.outerHTML, "logo.svg");
    }
  }, []);

  return (
    <div>
      <Button onClick={exportFunction} color="primary" variant="contained">
        Export
      </Button>

      <svg width={width} height={height} ref={svgRef}>
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
