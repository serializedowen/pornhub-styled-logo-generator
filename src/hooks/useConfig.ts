import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const defaultConfig = {
  width: 500,
  height: 350,
  leftWidth: 150,
  rightWidth: 150,
};
export default ({ content, splitIndex }: IRendererProps) => {
  const [state, setstate] = useState(defaultConfig);

  // const debounced = useDebounce({ content, splitIndex }, 100);

  useDebounce(content, 100);
  useEffect(() => {
    const newConfig = Object.assign({}, defaultConfig);

    const containerWidth =
      Math.max(
        content.substring(0, splitIndex).gblen,
        content.substring(splitIndex).gblen
      ) * 45;
    newConfig.width = containerWidth * 2 + 40;
    newConfig.height = Math.floor(newConfig.width * 0.6);

    newConfig.leftWidth = containerWidth;
    newConfig.rightWidth = containerWidth;

    setstate(newConfig);
    return () => {};
  }, [content, splitIndex]);

  return state;
};
