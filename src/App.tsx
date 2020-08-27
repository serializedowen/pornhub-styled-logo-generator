import React, { lazy, Suspense } from "react";
import Form from "./Form";
import { Box, Container, makeStyles } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import RendererTypes from "./renderers/rendererTypes";

const SvgRenderer = lazy(() => import("src/renderers/SvgRenderer"));
const CanvasRenderer = lazy(() => import("src/renderers/CanvasRenderer"));

const useStyles = makeStyles({
  container: {
    maxWidth: "500px",
  },

  previewer: {
    maxWidth: "700px",
    margin: "20px",
    padding: "20px",
  },
});

const Centered = styled("div")({
  overflow: "auto",
  textAlign: "center",
});

function App() {
  const [generateType, setGenerateType] = React.useState("");
  const [content, setContent] = React.useState("");
  const [splitIndex, setsplitIndex] = React.useState(0);

  const classes = useStyles();
  return (
    <Box>
      <Container className={classes.container}>
        <Form
          generateType={generateType}
          setGenerateType={setGenerateType}
          content={content}
          splitIndex={splitIndex}
          setsplitIndex={setsplitIndex}
          setContent={setContent}
        ></Form>
      </Container>
      <Centered>
        <Suspense fallback="loading">
          {generateType === RendererTypes.TYPE_SVG && (
            <SvgRenderer
              content={content}
              splitIndex={splitIndex}
            ></SvgRenderer>
          )}
          {generateType === RendererTypes.TYPE_CANVAS && (
            <CanvasRenderer
              content={content}
              splitIndex={splitIndex}
            ></CanvasRenderer>
          )}
        </Suspense>
      </Centered>
    </Box>
  );
}

export default App;
