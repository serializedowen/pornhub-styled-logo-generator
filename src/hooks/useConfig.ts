import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const defaultConfig = {
  width: 500,
  height: 350,
  leftWidth: 150,
  rightWidth: 150,
  padding: 20,
};
export default ({
  content,
  splitIndex,
}: Omit<IRendererProps, "setexportMethod">) => {
  const [state, setstate] = useState(defaultConfig);

  // const debounced = useDebounce({ content, splitIndex }, 100);

  useDebounce(content, 100);
  useEffect(() => {
    const newConfig = Object.assign({}, defaultConfig);

    newConfig.width =
      Math.max(
        content.substring(0, splitIndex).gblen,
        content.substring(splitIndex).gblen
      ) *
        45 *
        2 +
      40;
    // newConfig.height = Math.floor(newConfig.width * 0.6);
    newConfig.height = 150;

    newConfig.leftWidth = content.substring(0, splitIndex).gblen * 45;
    newConfig.rightWidth = content.substring(splitIndex).gblen * 45;

    setstate(newConfig);
    return () => {};
  }, [content, splitIndex]);

  return state;
};
