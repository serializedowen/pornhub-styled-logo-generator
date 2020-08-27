import React from "react";

import Form from "./Form";
import SvgRenderer from "./renderers/SvgRenderer";
import CanvasRenderer from "./renderers/CanvasRenderer";
import { Box, Container, makeStyles, Paper, Card } from "@material-ui/core";
import { styled } from "@material-ui/styles";

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
  const [generateType, setGenerateType] = React.useState("svg");
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
        <CanvasRenderer
          content={content}
          splitIndex={splitIndex}
        ></CanvasRenderer>
      </Centered>
      <Centered>
        <SvgRenderer content={content} splitIndex={splitIndex}></SvgRenderer>
      </Centered>
    </Box>
  );
}

export default App;
