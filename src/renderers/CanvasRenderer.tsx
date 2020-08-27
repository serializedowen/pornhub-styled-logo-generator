import React, { useEffect, useCallback, useRef } from "react";
import useConfig from "src/hooks/useConfig";
import drawRoundedRect from "src/utils/drawRoundedRect";
import download from "src/utils/download";
import { Button } from "@material-ui/core";
import { dataURItoBlob } from "src/utils/download";

let currentAnimation: number;

export default function CanvasRenderer({
  content,
  splitIndex,
  setexportMethod,
}: IRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { width, height, leftWidth, rightWidth, padding } = useConfig({
    content,
    splitIndex,
  });

  const exportFunction = useCallback(() => {
    if (canvasRef.current) {
      download(dataURItoBlob(canvasRef.current.toDataURL()), "logo.png");
    }
  }, []);
  useEffect(() => {
    setexportMethod(() => exportFunction);

    return () => {
      setexportMethod(() => () => {});
    };
  }, [exportFunction, setexportMethod]);

  React.useLayoutEffect(() => {
    const update = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d")!;
        canvasRef.current.width = width + 2 * padding;
        canvasRef.current.height = height + 2 * padding;

        drawRoundedRect(ctx, padding, padding, width, height, 10);

        ctx.fillStyle = "rgba(255,255,255)";
        ctx.font = "80px Arial";
        // fillStyle: "rgba(184, 184, 184, 0.8)",

        ctx.textBaseline = "middle";
        ctx.textAlign = "end";
        ctx.fillText(
          content.substr(0, splitIndex),
          width / 2 + padding,
          height / 2 + padding
        );

        ctx.fillStyle = "rgb(253,112,11)";
        drawRoundedRect(
          ctx,
          width / 2 + padding,
          height * 0.1 + padding,
          rightWidth,
          height * 0.8,
          10
        );

        ctx.textAlign = "start";

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillText(
          content.substr(splitIndex),
          width / 2 + padding,
          height / 2 + padding
        );
        ctx.save();
      }
    };

    currentAnimation = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(currentAnimation);
    };
  }, [width, height, leftWidth, rightWidth, content, splitIndex]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
